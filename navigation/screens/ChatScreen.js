import * as React from 'react';
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection,getFirestore, onSnapshot, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function ChatScreen({navigation}){
    const uid = getAuth().currentUser.uid;

    const [chats, setChats] = useState([]);

    //get all the users in database that dont have the same ID as the current user 
    const getUsers = async () => {
        try {
        onSnapshot(collection(getFirestore(), "users"), (snapshot) => {

            const currentUserDoc = snapshot.docs.filter(doc => doc.id === uid)[0];
            console.log("current user: ", currentUserDoc.data());
            let likes = currentUserDoc.get('likes') !== undefined ? currentUserDoc.get('likes') : [];
            console.log("current likes: ", likes);
            let matches = currentUserDoc.get('matches') !== undefined ? currentUserDoc.get('matches') : [];
            console.log("current matches: ", matches);
            const feed = snapshot.docs
                .filter((doc)=>doc.id !== uid)
                .filter((doc)=>matches.includes(doc.id))
                .map((doc)=>({
                    id: doc.id,
                    ...doc.data(),
                }));
            setChats(feed);
        })      
        } catch {
        console.log("error getting user data from firestore: ProfilePage");
        }
  }
  useEffect(() => {
    getUsers();
  }, []);

    let keyIndex;
    //rendering each like card 
    const renderItem = ({item, index}) => {
        return(
            <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Image style={styles.imageStyle} source={{uri: item.profilePicURL}} />
                <Text style={styles.name}>{item.displayName}</Text>
                <Text style={styles.message}>{item.bio}</Text>
            </TouchableOpacity>
            </View>
        )
    }
    if(chats.length > 0){
        return(
            <View style={{flex: 1}}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={chats}
                renderItem={renderItem}
                keyExtractor={item => keyIndex = item.id}
                />            
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>
                <Text style={styles.nomoretext}>No chats! Scroll through the profiles and likes to start chatting!</Text>
            </View>
        )
    }
    
}

const radius = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      nomoretext:{
        fontSize: 25,
        textAlign: 'center',
        margin: 20
    
      },
    cardContainer:{
        width: "95%",
        backgroundColor: '#add8e6',
        height: 100,
        borderRadius: radius,
        margin: 10
    },
    imageStyle: {
        height: 100,
        width: '40%',
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius
    },
    name: {
        width:100,
        fontSize: 15, 
        fontWeight: 'bold',
        left: '45%',
        bottom: 90
    },
    message: {
        width: '50%',
        fontSize: 12, 
        height: 50, 
        left: '45%',
        bottom: 90,
        backgroundColor: 'white',
        borderRadius: 10
    },
});