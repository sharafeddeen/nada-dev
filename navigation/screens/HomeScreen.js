import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions} from 'react-native';
import { getAuth } from 'firebase/auth';
import { useEffect} from 'react';

import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import { collection,getFirestore, onSnapshot, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const deviceWidth = Dimensions.get('window').width;

export default function HomeScreen ({navigation}) {
  let [profiles, setProfiles] = React.useState([]);
  const uid = getAuth().currentUser.uid;
  

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
              .filter((doc)=>likes.includes(doc.id) === false)
              .filter((doc)=>matches.includes(doc.id) === false)
              .map((doc)=>({
                id: doc.id,
                ...doc.data(),
              }));
        setProfiles(feed);
      })      
    } catch {
      console.log("error getting user data from firestore: ProfilePage");
    }
  }
  useEffect(() => {
    getUsers();
  }, []);


  //hitting the hangout button 
  const wantsToHangout = async (id) => {
    console.log(id);

    /* ------------- Add to current user's "likes" collection ------------- */
    const docRef = doc(getFirestore(), 'users', `${uid}`);
    const snapshot = await getDoc(docRef);
    
    // is this the user's first like button hit?
    if (snapshot.data().likes === undefined) {
      await setDoc(docRef, { ...snapshot.data(), likes: [id] });
      const updatedSnapshot = await getDoc(docRef);
      console.log("user's first like: ", updatedSnapshot.data().likes);
    
    } else {
      const updatedLikes = snapshot.data().likes;
      updatedLikes.push(id);
      await updateDoc(docRef, { likes: updatedLikes });
      const updatedSnapshot = await getDoc(docRef);
      console.log("new likes are: ", updatedSnapshot.data().likes);
    }
    /* ------------------- Finished adding to "likes" ------------------- */    

    const newProfiles = profiles.filter((item) => item.id !== id);
    setProfiles(newProfiles);      
  }

  //rendering each profile card 
  const renderItem = ({item, index}) => {
        return(
          <View style={{height: 500}}> 
            <ScrollView 
                horizontal= {true}
                decelerationRate={200}
                snapToInterval={0}
                snapToAlignment={"start"}
                alwaysBounceHorizontal={true}
                showsHorizontalScrollIndicator={false}
                contentInset={{
                top: 0,
                left: 35,
                bottom: 0,
                right: 30,
            }}>
            <Card1 name={item.displayName} image={item.profilePicURL}/>
            <Card2 bio={item.bio} activities={item.activities}/>

            <View style={{width: deviceWidth, alignItems: 'center',  top: '25%'}}>
              <TouchableOpacity style={styles.wink} onPress={() => wantsToHangout( item.id)}>
                <Text style={styles.text}> Let's Hangout with {item.displayName}</Text>
              </TouchableOpacity> 
            </View> 
            
            </ScrollView>
          </View>
      )
  }
  //if there is no more profiles in the feed 
  if(profiles.length == 0){
    return (
      <View style={styles.container}>
          <Text style={styles.nomoretext}>No more profiles! It looks like your really popular!</Text>         
      </View>
    )
  }

  
  //if there is profiles, render them in a flatlist 
  else{
    return (
      <View style={styles.container}>
        <View style={{height: 500}} >
            <FlatList
            contentContainerStyle={styles.listView}
            showsVerticalScrollIndicator={false}
            data={profiles}
            renderItem={item=> renderItem(item)}
            pagingEnabled
            decelerationRate= {'normal'}
            />
          </View> 
          <Text style={styles.directions}>Scroll all the way to the left of each profile hit the hang out button!</Text>   
      </View>
    );
  }
    
  }

  const radius = 20;
const styles = StyleSheet.create({
  listView: {
    justifyContent: 'center',
  },
  nomoretext:{
    fontSize: 25,
    textAlign: 'center',
    margin: 20
  },
  directions:{
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange', 
    textAlign: 'center',        
    height: 50, 
},
wink:{
  backgroundColor: '#ffff00',
  bottom: '11%',
  width: '75%',
  borderRadius: radius + 10,
  height: 70,
  textAlign: 'center'
}, 
text:{
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
}
});