import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions} from 'react-native';
import { getAuth } from 'firebase/auth';
import { useEffect} from 'react';

import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import { collection,getFirestore, onSnapshot } from "firebase/firestore";


const deviceWidth = Dimensions.get('window').width;

export default function HomeScreen ({navigation}) {
  let [profiles, setProfiles] = React.useState([]);
  const uid = getAuth().currentUser.uid;
  

  //get all the users in database that dont have the same ID as the current user 
  const getUsers = async () => {
    let unSub;
    try {
      unSub = await onSnapshot(collection(getFirestore(), "users"), (snapshot) =>{
        setProfiles(
          snapshot.docs.filter((doc)=>doc.id !== uid)
          .map((doc)=>({
            id: doc.id,
            ...doc.data(),
          }))
        )
      })      
    } catch {
      console.log("error getting user data from firestore: ProfilePage");
    }
  }
  useEffect(() => {
    getUsers();
  }, []);


  let keyIndex;

  //hitting the hangout button 
  const wantsToHangout = (id) => {
    console.log(id);
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