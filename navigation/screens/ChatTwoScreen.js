import { Platform } from 'expo-modules-core';
import * as React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, StatusBar, FlatList, TouchableWithoutFeedback} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getAuth } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, doc, getDoc, setDoc, updateDoc, getDocs, serverTimestamp, FieldValue, Timestamp } from "firebase/firestore";
import { useState, useEffect, useLayoutEffect, useCallback } from 'react';

export default function ChatTwoScreen(props){

    console.log("First --- in ChatTwoScreen, other user is: ", props.route.params.item);

    return <ChatRoom otherUser={props.route.params.item} />;
}

function Room(props) {

    const uid = getAuth().currentUser.uid;
    let thisUserID = uid;
    let otherUserID = props.otherUser.id;

    const [roomState, setRoomState] = useState({ 
        input: { readyToSend: false, content: "" }, 
        history: {readyToUpdate: true, content: [] } 
    });
    /*
    useEffect(() => {
        console.log("useEffect to getChatHistory()");
        (async () => await getChatHistory()
        .then(array => roomState.history.readyToUpdate ? setRoomState({input: roomState.input, history: {readyToUpdate: false, content: array}}) : null)
        )();
    }, []);
    /*
    useEffect(() => {
        console.log("useEffect to sendInput()");
        roomState.input.readyToSend? sendInput() : null;
    }, [roomState.input.readyToSend]);
    */

    let updateHistory = async() => {
        let chatQuerySnapshot = await getDocs(collection(getFirestore(), 'chat'));
        let chatDoc = chatQuerySnapshot.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0];          

        onSnapshot(chatDoc.ref, (snapshot) => {
            snapshot.get('chatContent') !== roomState.history.content?
                ( () => {
                    console.log("new message: ", snapshot.get('chatContent'))
                    chatHistory = snapshot.get('chatContent');
                    console.log("update history: ", snapshot.get('chatContent'))
                    let newState = { input: {readyToSend: false, content: roomState.input.content}, history: {readyToUpdate: true, content: snapshot.get('chatContent')} }
                    setRoomState(newState);
                })()
                :
                null;
        })
    };

    //get all the users in database that dont have the same ID as the current user 
     async function getChatHistory () {

        let chatQuerySnapshot = await getDocs(collection(getFirestore(), 'chat'));
        let chatDoc = chatQuerySnapshot.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0];          
        console.log("chatDoc is: ", chatDoc);
        
        if ( chatDoc === undefined ) { // first ID
            let docData = {
                            userIDs: [uid, props.otherUser.id],
                            chatContent: []
                        }
            await setDoc(chatDoc.ref, docData)
            .then(chatDoc = await getDoc(chatDoc.ref))
        };
        console.log("from getChatHistory(): ", chatDoc.get('chatContent'));
        return chatDoc.get('chatContent');
    };

    async function sendInput () {
        
        let ready = true;
        let newMessage = {from: thisUserID, to: otherUserID, content: roomState.input.content, timestamp: Timestamp.now()};

        let chatQuerySnapshot = await getDocs(collection(getFirestore(), 'chat'));
        let chatDoc = chatQuerySnapshot.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0];          

        let oldHistory = chatDoc.get('chatContent');
        let newHistory = [...oldHistory, newMessage];  
        let newRoomState = { input: {readyToSend: false, content: ""}, history: { readyToUpdate: false, content: newHistory } };
        
        await updateDoc(chatDoc.ref, {'chatContent': newHistory} )
        .then(console.log("New state: ", newRoomState))
        .then( setRoomState( newRoomState ) )
        .catch(err => console.log("Error sending input!", err));
        
        return ready;
    };
 
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height" }
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <>
                <FlatList
                    inverted
                    data={[...roomState.history.content].reverse()}
                    keyExtractor={(item) => item.timestamp}
                    renderItem={({ item }) => {
                        return (
                        <SingleMessage side={item?.from === thisUserID? 'right' : 'left'} message={item?.content} />
                        )
                    }}
                />
                <View style={styles.footer}>
                    <TextInput
                        value={roomState.input.content}
                        onChangeText={ (text) => setRoomState({ input: { readyToSend: false, content: text }, history: roomState.history }) }
                        placeholder="Send Message"
                        style={styles.textInput}
                    >
                    </TextInput>
                    <TouchableOpacity activeOpacity={0.5} onPress={ roomState.input.content !== "" ? sendInput : null } >
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>
                </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}






function ChatRoom(props) {

    const uid = getAuth().currentUser.uid;
    let thisUserID = uid;
    let otherUserID = props.otherUser.id;

    const [roomState, setRoomState] = useState({ 
        input: { readyToSend: false, content: "" }, 
        history: {readyToUpdate: true, content: [] } 
    });

    /*
    useEffect(() => {
        console.log("useEffect to sendInput()");
        roomState.input.readyToSend? sendInput() : null;
    }, [roomState.input.readyToSend]);
    */

    async function sendInput () {
        
        let ready = true;
        let newMessage = {from: thisUserID, to: otherUserID, content: roomState.input.content, timestamp: Timestamp.now()};

        let chatQuerySnapshot = await getDocs(collection(getFirestore(), 'chat'));
        let chatDoc = chatQuerySnapshot.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0];          

        let oldHistory = chatDoc.get('chatContent');
        let newHistory = [...oldHistory, newMessage];  
        let newRoomState = { input: {readyToSend: false, content: ""}, history: { readyToUpdate: true, content: newHistory } };
        
        await updateDoc(chatDoc.ref, {'chatContent': newHistory} )
        .then(console.log("New state: ", newRoomState))
        .then( setRoomState( newRoomState ) )
        .catch(err => console.log("Error sending input!", err));
        
        return ready;
    };
 
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height" }
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <>
                <ChatHistory otherUser={props.otherUser} />
                <View style={styles.footer}>
                    <TextInput
                        value={roomState.input.content}
                        onChangeText={ (text) => setRoomState({ input: { readyToSend: false, content: text }, history: roomState.history }) }
                        placeholder="Send Message"
                        style={styles.textInput}
                    >
                    </TextInput>
                    <TouchableOpacity activeOpacity={0.5} onPress={ () => roomState.input.content !== "" ? sendInput() : null } >
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>
                </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}


function ChatHistory(props) {

    const uid = getAuth().currentUser.uid;
    const [chat, setChat] = useState([]);
    const [isFirstTime, setIsFirstTime] = useState(true);

    /*
    (async function checkIfFirstChat () {
        let chatQuerySnapshot = await getDocs(collection(getFirestore(), 'chat'));
        let chatDoc = chatQuerySnapshot.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0];          

        chatDoc.exists() ?
            null
            :
            ( async () => {
                let docData = {userIDs: [uid, props.otherUser.id], chatContent: []}
                let docRef = doc(getFirestore(), 'chat', `${uid} ${props.otherUser.id}`)
                await setDoc(docRef, docData).then(setChat([]));
            })();
    })();

    useEffect(() => {
        async function isFirstChat () {
            let docData = {userIDs: [uid, props.otherUser.id], chatContent: []}
            let docRef = doc(getFirestore(), 'chat', `${uid} ${props.otherUser.id}`)
            await setDoc(docRef, docData).then(setChat([]));
        };
    }, []);
    */

    function isFirstChat () 
    {
            isFirstTime && (async() => {
                let docData = {userIDs: [uid, props.otherUser.id], chatContent: []};
                await getDocs(collection(getFirestore(), 'chat'))
                .then(snap => snap.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0])
                .then(doc => doc === undefined || doc.exists() === false)
                .then( noPrevChat => noPrevChat     &&      (async () => await setDoc(doc(getFirestore(), 'chat', `${uid} ${props.otherUser.id}`), docData).then(setChat([])))());
            })();
        return false;
    };

    useLayoutEffect(() => 
    {
        isFirstTime && setIsFirstTime(isFirstChat());
        return () => setIsFirstTime(false);
    }, [])

    function fetchHistory () 
    {
        let updatedChat = chat.length > 0 ? [...chat] : [];      
        //isFirstTime && isFirstChat();
        onSnapshot(collection(getFirestore(), 'chat'), 
            (snapshot) => {
                let listenerDoc = snapshot.docs.filter( doc => doc.get('userIDs').includes(uid)).filter(doc => doc.get('userIDs').includes(props.otherUser.id) )[0];
                listenerDoc !== undefined && console.log("...checking   updatedChat", updatedChat, "listenerDocChat: ", listenerDoc.get('chatContent'));
                
                if (listenerDoc !== undefined){ 
                    if (listenerDoc.exists() && updatedChat.length !== listenerDoc.get('chatContent').length) {
                        updatedChat = listenerDoc.get('chatContent');
                        setChat(listenerDoc.get('chatContent'));                       
                    } else {
                        console.log("docExists?", listenerDoc.exists() && console.log(` YES? (${listenerDoc.exists()}) then no new messages, listenerChat`, listenerDoc.get('chatContent')), "updatedChat: ", updatedChat);
                    }
                } else { 
                    console.log("no prev history, docExists?", listenerDoc !== undefined, "updatedChat: ", updatedChat);
                }
            }
        );   
    };

    useEffect(() => 
    {
        fetchHistory();             
        return () => setChat([]);
    }, []);
    
    if(isFirstTime) return (<Text>Loading{console.log(` component render   [firstTime: ${isFirstTime}] `)}...</Text>);

    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            {console.log("return re-render,     isFirstTime? ", isFirstTime)}
            <FlatList
                inverted
                data={ [...chat].reverse() }
                keyExtractor={(item) => item.timestamp}
                renderItem={({ item }) => {
                    return (
                    <SingleMessage side={item?.from === uid? 'right' : 'left'} message={item?.content} />
                    )
                }}
            />
        </View>
    )
}

function SingleMessage({message, side}) {

    const singleMessageStyles = StyleSheet.create({
        container: {
          width: '100%',
          paddingVertical: 3,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start'
        },
        textContainer: {
          width: 160,
          backgroundColor: '#281638',
      
          borderRadius: 40,
          paddingHorizontal: 15,
          paddingVertical: 12,
          marginLeft: 10
        },
        rightContainer: {
          justifyContent: 'flex-end'
        },
        rightTextContainer: {
          backgroundColor: '#ffa500',
          marginRight: 10
        },
        leftText: {
          textAlign: 'left',
          color: 'white',
        },
        rightText: {
          textAlign: 'right',
          color: 'black'
        },
        text: {
          fontSize: 12
        }
      });
    
    const singleMessageFlattenedStyles = {
        container: StyleSheet.flatten([singleMessageStyles.container, singleMessageStyles.rightContainer]),
        textContainer: StyleSheet.flatten([singleMessageStyles.textContainer, singleMessageStyles.rightTextContainer]),
        leftText: StyleSheet.flatten([singleMessageStyles.leftText, singleMessageStyles.text]),
        rightText: StyleSheet.flatten([singleMessageStyles.rightText, singleMessageStyles.text])
    }

    const isLeftSide = side === 'left';

    const containerStyles = isLeftSide ? singleMessageStyles.container : singleMessageFlattenedStyles.container
    const textContainerStyles = isLeftSide ? singleMessageStyles.textContainer : singleMessageFlattenedStyles.textContainer
    const textStyles = isLeftSide ? singleMessageFlattenedStyles.leftText : singleMessageFlattenedStyles.rightText
      

    return (
      <View style={containerStyles}>
        <View style={textContainerStyles}>
          <Text style={textStyles}>
            {message}
          </Text>
        </View>
      </View>
    )
}

/*function ChatInput(props) {

    const thisUserID = props.thisUserID;
    const otherUserID = props.otherUser.id;

    const [input, setInput] = useState("");
    console.log("Input is now: ", input);

    const sendMessage = async () => {

        let content = input === ""? <ChatRoom otherUser={props.otherUser}></ChatRoom> : input;

        onSnapshot(collection(getFirestore(), "chat"), async (snapshot) => {

            let chatNew = {from: thisUserID, to: otherUserID, content: content, timestamp: Timestamp.now()}
            let chatDoc = snapshot.docs.filter( doc => doc.get('userIDs').includes(thisUserID)).filter(doc => doc.get('userIDs').includes(otherUserID) )[0];          
            let chatDocRef = chatDoc.ref;
            let chatHistory = chatDoc.get('chatContent');
            chatHistory[chatHistory.length] = chatNew;

            console.log("CHAT DOC IS: ", chatDoc, chatDocRef);
            console.log("CHAT HISTORY: ", chatHistory);

            await updateDoc(chatDocRef, {'chatContent': chatHistory === []? [message] : [chatHistory.elements, chatNew]})
            chatDoc = await getDoc(chatDocRef)
            //.catch(err => console.log("ERROR While Updating!", err))            
            //.then(console.log("chat UPDATED: ", chatDoc.data()))
        });
    }

    useEffect(() => {
        sendMessage();
    }, []);
    
    return(
        <View style={styles.footer}>
            <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Send Message"
                style={styles.textInput}
            >
            </TextInput>
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} >
                <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
        </View>
    );
}
*/

/*function JosiahChatTwoScreen() {

    const [input, setInput] = React.useState("");

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height" }
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <>
                <ScrollView>{/*Chat goes here* }</ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        placeholder="Send Message"
                        style={styles.textInput}
                    >
                        
                    </TextInput>
                    <TouchableOpacity activeOpacity={0.5} >
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                    </TouchableOpacity>

                </View>
                </>

            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
*/

const styles = StyleSheet.create({
    container: {
        flex: 1  
    }, 
    footer:{
        flexDirection: "row",
        alignItems: "center",
        width:"100%",
        padding: 15, 
    },
    textInput: {
       bottom: 0,
       height: 40,
       flex: 1,
       marginRight: 15,
       backgroundColor: "#ECECEC",
       padding: 10,
       color: "grey",
       borderRadius: 30, 
    },
   
});