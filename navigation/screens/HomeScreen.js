import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { getAuth } from 'firebase/auth';
import { useEffect} from 'react';

import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import {  query, collection, doc, getDoc, getFirestore, where } from "firebase/firestore";

export default function HomeScreen ({navigation}) {
  const [user, setUser] = React.useState(null);
  const uid = getAuth().currentUser.uid;
  

  let profiles = [1];
  const getUsers = async () => {
    try {
      const docSnapshot = await getDoc(doc(getFirestore(), 'users', uid));
      const userData = docSnapshot.data();
      setUser(userData);
    } catch {
      console.log("error getting user data from firestore: ProfilePage");
    }
  }
  useEffect(() => {
    getUsers();
  }, []);


  let keyIndex;

  //hitting the hangout button 
  const wantsToHangout = (index) => {

    const filteredProfiles = profiles.filter(item => item.id !== index);

    setProfiles(filteredProfiles);
        
  }
  //rendering each profile card 
  const renderItem = ({item, index}) => {
        return(
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
          <Card1 name={user?.displayName} image={user?.profilePicURL}/>
          <Card2 bio={user?.bio} activities={user?.activities}/>
          </ScrollView>
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
          <View style = {{ alignItems: 'center', justifyContent: 'center', height: '82%'}}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={profiles}
            renderItem={renderItem}
            pagingEnabled
            keyExtractor={item => keyIndex = item.id}
            decelerationRate= {'normal'}
            />
          </View>      
          <TouchableOpacity style={styles.wink} onPress={() => wantsToHangout( keyIndex)}>
          <Text style={styles.text}> Let's Hangout</Text>
          </TouchableOpacity>      
      </View>
    );
  }
    
  }

  const radius = 20;
const styles = StyleSheet.create({
  nomoretext:{
    fontSize: 25,
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
  bottom: '-1%',
  width: '75%',
  borderRadius: radius + 10,
  height: 55,
  textAlign: 'center'
}, 
text:{
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold'
}
});