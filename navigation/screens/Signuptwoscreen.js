import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



export default function SignupScreen ({navigation}) {

  /*********    STATE VARIABLES       ********/
  const [bio, setBio] = React.useState("");                   // user's bio
  const [activities, setActivities] = React.useState("");     // user's activities
  const [image, setImage] = React.useState(null);               // user's profile image

  /********     CONTROL FUNCTIONS     ********/
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
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

  const uploadImage = async (image) => {

    // if an image is selected, fetch its data
    const response = await fetch(image);
    const blob = await response.blob();
    console.log("Begin uploading: ", blob);
    console.log("Server/bucket: ", getStorage());

    // then, upload the image to Firebase Storage
    const picStorageRef = ref(getStorage(), `users/${getAuth().currentUser.uid}/profilePic.jpg`)
    uploadBytes(picStorageRef, blob)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((downloadURL) => {getAuth().currentUser.photoURL = downloadURL})
    .then(navigation.navigate('BottomTab'))
    .catch((error) => {console.log(error)})
  
  };

  /***************             BACKEND CODE             **********************
   * 
   * PURPOSE: to update the user profile with bio, activities, and image.
   * 
   * NOTE(S):
   *          1)  We will be using Firebase "User instances".
   *              ->  Don't confuse them with "Firebase Auth instances".
   *          2)  A User object is stored in its own DB.
   * 
   * MORE INFO: https://firebase.google.com/docs/auth/users
   * 
   ***********                   BEGIN                  ********************/
  
   const createUserInFirestore = async () => {  
    let listener = getAuth().onAuthStateChanged((user) => {   
      if (user) {
        console.log("// User logged in already or has just logged in.", user);
        
        // prepare user profile in JSON-like form
        const userJSON = JSON.parse(JSON.stringify(user));
        const newUserData = {
          displayName: username, // username is the local state var defined above
          email: email,
          profilePicURL: user.photoURL,
          bio: bio,
          activities: activities
        };

        // create Firestore doc with same ID as user in Firebase Auth
        const newUserID = user.uid;
        const newDoc = setDoc(doc(getFirestore(), "users", newUserID), newUserData);

        // navigate to user profile
        navigation.navigate('BottomTab')
        
      } else {
        console.log("// User not logged in or has just logged out.");
      }
    })
  };


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
      <Button title="Change Profile Image" style={styles.button} onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
      <TouchableOpacity
        style={styles.button} 
        onPress={uploadImage}>
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