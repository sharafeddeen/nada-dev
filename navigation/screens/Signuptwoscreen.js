import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



export default function SignupScreen ({navigation}) {

  /*********               STATE VARIABLES             ********/
  const [bio, setBio] = React.useState("");                   // user's bio
  const [activities, setActivities] = React.useState("");     // user's activities
  const [image, setImage] = React.useState(null);             // user's profile image
  /* -------------------------------------------------------  */


  /********              CONTROL FUNCTIONS             ********/
  const pickImage = async () => {
    console.log("image is beginning to be picked");
    // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("image is result", result);
  
      if (!result.cancelled) {
        // set image only if user uploads one
        setImage(result.uri);
        console.log("image is ready to upload");
      }
  };

  const uploadImage = async () => {
    
    // if an image is selected, fetch its data
    //console.log("local uri should be here: ", image);
    const response = await fetch(image);
    const blob = await response.blob();
    console.log("Begin uploading: ", blob);
    console.log("Server/bucket: ", getStorage());

    // then, upload the image to Firebase Storage
    const picStorageRef = ref(getStorage(), `users/${getAuth().currentUser.uid}/profilePic`)
    await uploadBytes(picStorageRef, blob)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((url) => getAuth().currentUser.photoURL = url)
    .then(() => createUserInFirestore());
};
  
  const createUserInFirestore =  async () => {

    const user = getAuth().currentUser;    
    const newUserData = {
      displayName: user.displayName,
      email: user.email,
      profilePicURL: user.photoURL,
      bio: bio,
      activities: activities,
    }

    // create Firestore doc with same ID as user in Firebase Auth
    await setDoc(doc(getFirestore(), 'users', `${user.uid}`), newUserData)
    const snapshot = await getDoc(doc(getFirestore(), 'users', `${user.uid}`));

    if(snapshot.exists){
      navigation.navigate('BottomTab');
    } else {
      console.log("snapshot doesn't exist")
    }
};

  /***********                   Render                  ********************/
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.headerText}>Other essential information!</Text>
      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>Bio</Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setBio(text)}
          placeholder="tell us a little bit about yourself"
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>Activities </Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setActivities(text)}
          placeholder="Seperate each by a ','"
        />
      </View>
    
      <Text style={styles.inputHeader}>Profile Image </Text>
      <Button title="Change Profile Image" style={styles.button} onPress={() => pickImage()} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
      <TouchableOpacity
        style={styles.button} 
        onPress={() => {image && uploadImage()}}>
        <Text style={styles.buttonText} > Profile</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );

}


/*********************************************************************************************************/
/*                                              Style                                                    */
/*********************************************************************************************************/

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },

  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  headerText: {
    padding: 40,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'darkslategray',
    textAlign: 'center'
  },

  inputBox: {
    marginRight: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    alignSelf: 'flex-end',
    width: '50%',
  },

  inputHeader: {
    marginLeft: 30,
    paddingRight: 30,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  button: {
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#add8e6', 
    textAlign: 'center',        
    height: 50,
    alignSelf: 'center',
    borderRadius: 20
  },
  buttonImage: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal:10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#add8e6', 
    textAlign: 'center',        
    height: 45,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  }
});