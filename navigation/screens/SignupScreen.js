import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupScreen ({navigation}) {

  / --- state variables for:    essential attributes of user signup --- /
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


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
  
  const createUserInAuth = () => {    
    // 1)     create user instance in Firebase Auth
    createUserWithEmailAndPassword(getAuth(), email, password)
      // signed in
      .then((userCredential) => {
        userCredential.user.displayName = username;
        navigation.navigate('SignuptwoScreen');
      })
      .catch((error) => {
        console.log("Error: signup failed!")
        console.log(error);
      })
    };
  

  return (
    <View style={styles.container}>
      <ScrollView>

      <Text style={styles.headerText}>Let's get this profile started!</Text>
      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>your name</Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="what should we call you?"
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>email</Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setEmail(text)}
          placeholder="totally@obvious.com"
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>password</Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          placeholder=" 6 symbols or more.. "
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => {createUserInAuth}}>
          <Text style={styles.buttonText}>Create Profile</Text>
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
    backgroundColor: 'white',
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