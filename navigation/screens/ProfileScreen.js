import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';



/* ------------------------------------------------------------------------------------------------------------   
                                        Container / Navigator    
------------------------------------------------------------------------------------------------------------ */ 
export default function ProfileScreen ({navigation}) {
     
  const [showProfile, setShowProfile] = useState(true);

  if (showProfile) {
    return (
      <View style={styles.container}>
          <Button title="View Settings" style={styles.button} onPress={() => {setShowProfile(false)}}/>
          <ProfilePage/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <Button title="View Profile" style={styles.button} onPress={() => {setShowProfile(true)}}/>
        <SettingsPage/>
    </View>
  )

}

/* ------------------------------------------------------------------------------------------------------------   
                                                Profile    
------------------------------------------------------------------------------------------------------------ */ 

function ProfilePage ({navigation}) {
  
  return (
    <View>
      <Text style={styles.title}>Hey! This is your profile</Text>
    </View>
  )
}


/* ------------------------------------------------------------------------------------------------------------   
                                                Settings    
------------------------------------------------------------------------------------------------------------ */ 
function SettingsPage ({navigation}) {

  const [image, setImage] = useState(null);
  const [pickedImagePath, setPickedImagePath] = useState('');
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>First Name</Text>
        <TextInput style={styles.input}></TextInput>
        <TouchableOpacity
          style={styles.submit}>
              <Text>Change First Name</Text>
        </TouchableOpacity>
              <Text style={styles.title}>Email</Text>
              <TextInput style={styles.input}></TextInput>
              <TouchableOpacity
              style={styles.submit}>
                  <Text>Change Email</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Password</Text>
              <TextInput style={styles.input}></TextInput>
              <TouchableOpacity
              style={styles.submit}>
                  <Text>Change Password</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Bio</Text>
              <TextInput style={styles.input}></TextInput>
              <TouchableOpacity
              style={styles.submit}>
                  <Text>Change Bio</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Profile Picture</Text>
              <Button title="Change Profile Image" style={styles.button} onPress={pickImage} />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
              <Text style={styles.title}>Activties</Text>
              <TextInput style={styles.input}></TextInput>
              <TouchableOpacity
              style={styles.submit}>
                  <Text>Change Activies</Text>
              </TouchableOpacity>
      </ScrollView>
    </View>
  );


}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    padding: 5,
    margin: 0, 
    fontSize: 20,
    fontWeight: "bold"
},
input: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width: '80%',
  },
submit: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    left: 0,
    margin: 5,
    width: '80%',
    backgroundColor: '#87CEEE', 
    textAlign: 'center',        
},
button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#87CEEE', 
    textAlign: 'center',        
    height: 50
  },
});