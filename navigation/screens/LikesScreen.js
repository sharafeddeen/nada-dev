import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList,Text, TouchableOpacity, Image, Button, ScrollView} from 'react-native';
import exampleImage from '../Assets/paul.jpg';

import {onSnapshot, getDoc, doc, collection, getFirestore, query, getDocs, where, updateDoc} from "firebase/firestore";
import { getAuth } from 'firebase/auth';


export default function LikesScreen({navigation}){

    const [showFans, setShowFans] = useState(true);

    if (showFans) {
      return (
        <View style={styles.container}>
            <Button title="See your likes" style={styles.button} onPress={() => {setShowFans(false)}}/>
            <FanPage/>
        </View>
      )
    }
  
    return (
      <View style={styles.container}>
          <Button title="See your fans" style={styles.button} onPress={() => {setShowFans(true)}}/>
          <LikesPage/>
      </View>
    )
    
}


function FanPage({navigation}){

    let [likes, setLikes] = React.useState([]);
    const uid = getAuth().currentUser.uid;

    //get all the users in database that dont have the same ID as the current user 
    const getUsers = async () => {
      try {
        console.log("BEGIN BEGIN BEGIN");
        const usersQuery = query(collection(getFirestore(), "users"));
        const querySnapshot = await getDocs(usersQuery);
        let fans = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            if(doc.data().hasOwnProperty('likes') && doc.data().likes.includes(uid)) {
                fans.push({id: doc.id, ...doc.data()});
            }
        });
        console.log("fans are: ", fans);
        setLikes(fans);
    } catch (error) {
        console.log("error getting user data from firestore: LikesScreen", error);
      }
    }
    useEffect(() => {
      getUsers();
    }, []);

    //rendering each like card 
    const renderItem = ({item, index}) => {
        return(
        <View style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={{uri: item.profilePicURL}}/>
            <Text style={styles.name}> {item.displayName} </Text>
            <Text style={styles.bio}> {item.bio} </Text>
            <Text style={styles.activities}> {item.activities} </Text>
            <TouchableOpacity style={styles.wink} onPress={()=>match(keyIndex)}>
                <Text>Let's Hangout</Text>
            </TouchableOpacity>
        </View>
        )
    }

    let keyIndex;

    const match = async (index) => {

        // match the two on firestore
        console.log("BEGIN BEGIN BEGIN");
        const usersQuery = query(collection(getFirestore(), "users"));
        const querySnapshot = await getDocs(usersQuery);
        console.log("length is ", index);
        querySnapshot.forEach( async (queryDoc) => {
            
            if(queryDoc.id === index) {
                let newMatches = queryDoc.get('matches') !== undefined ? [...queryDoc.data().matches, uid] : [uid];
                console.log("HERE --------- Ref & Matches: ", newMatches);
                await updateDoc(queryDoc.ref, {"matches": newMatches});
                let newLikes = queryDoc.get('likes') !== undefined ? queryDoc.get('likes').filter(id => id !== uid) : [];
                newLikes !== [] ? await updateDoc(queryDoc.ref, {"likes": newLikes}) : null;

            } else if (queryDoc.id === uid) {
                let newMatches = queryDoc.get('matches') !== undefined ? [...queryDoc.data().matches, index] : [index];
                console.log("HERE --------- Ref & Matches: ", newMatches);
                await updateDoc(queryDoc.ref, {"matches": newMatches});
                let newLikes = queryDoc.get('likes') !== undefined ? queryDoc.get('likes').filter(id => id !== index) : [];
                newLikes !== [] ? await updateDoc(queryDoc.ref, {"likes": newLikes}) : null;
            }    
        });

        // refresh page with new info
        const filteredLikes= likes.filter(item => item.id !== index);
        setLikes(filteredLikes);
            
    }
    if(likes.length > 0){
        return(
            <View style={{flex: 1, width: '100%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}> Here are your fans </Text>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={likes}
                renderItem={renderItem}
                keyExtractor={item => keyIndex = item.id}
                />            
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>
                <Text style={styles.nomoretext}>Hmm. You either don't have fans yet or you really do like to talk to everyone</Text>
            </View>
        )
    }
    
}

function LikesPage({navigation}) {

    const [likes, setLikes] = useState([]);
    const uid = getAuth().currentUser.uid;

    const getUserLikes = async () => { 
        const currentUserSnap = await getDoc(doc(getFirestore(), 'users', `${uid}`));
        let likesIDs = currentUserSnap.data().hasOwnProperty('likes') ? currentUserSnap.data().likes : [];

        let likesDocs = [];
        const usersQuery = query(collection(getFirestore(), "users"));
        const querySnapshot = await getDocs(usersQuery);
        querySnapshot.forEach(doc => {
            likesIDs.includes(doc.id) && doc.get('likes') && doc.get('likes').includes(uid) ? 
                match(doc.id)
            : likesIDs.includes(doc.id)? likesDocs.push(doc.data()) 
            : null;
        });
        console.log("docs of likes: ", likesDocs);
        setLikes(likesDocs);
    }
    useEffect(() => { 
        getUserLikes();
    }, []);

    //rendering each like card 
    const renderItem = ({item, index}) => {
        return(
        <View style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={{uri: item.profilePicURL}}/>
            <Text style={styles.name}> {item.displayName} </Text>
            <Text style={styles.bio}> {item.bio} </Text>
            <Text style={styles.activities}> {item.activities} </Text>
        </View>
        )
    }
    let keyIndex;

    if(likes.length > 0){

        return(
            <View style={{flex: 1, width: '100%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}> Here are your likes </Text>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={likes}
                renderItem={renderItem}
                keyExtractor={item => keyIndex = item.email}
                />            
            </View>
        );

    } else {

        return (
            <View>
                <Text stlye={styles.nomoretext}> Your likes {likes} will appear here!  </Text>
            </View>
        )
    }

}

const radius = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardContainer:{
        flex: 1,
        width: '95%',
        height: '100%',
        backgroundColor: '#add8e6',
        borderRadius: radius,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 25,
        marginTop: 20,
        marginBottom: 20, 
    },
    imageStyle: {
        height: "100%",
        width: '45%',
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius
    },
    name: {
        width:"25%",
        fontSize: 15, 
        fontWeight: 'bold',
        left: "10%",
        top: "-30%",
        backgroundColor: 'white', 
        textAlign: 'center',
        borderRadius: radius
    },
    bio: {
        width: "50%",
        fontSize: 12, 
        left: "46%",
        top: "-90%"
    },
    activities: {
        width: 150,
        fontSize: 12, 
        left: "46%",
        top:"-90%"
    },
    wink: {
        backgroundColor: '#ffff00', 
        width: '30%',
        left: "46%",
        top: "-175%",
        borderRadius: 20,
    },
    nomoretext:{
        fontSize: 25,
        textAlign: 'center',
        margin: 20
    
      },
});