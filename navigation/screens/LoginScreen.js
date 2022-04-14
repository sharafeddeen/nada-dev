import * as React from 'react';
import {useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen ({navigation}) {

  / --- state variables for:    essential attributes of user login --- /
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  
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

  const loginAuth = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("user logged in successfully!", userCredential)
        navigation.navigate('BottomTab')
      })
      .catch((error) => {
        console.log("Error during login -- not signed in!")
        console.log(error);
      });
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>If it's not obvious, this is the login page.</Text>

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
          placeholder="You didn't forget it right?"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.button} 
        onPress={loginAuth}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
  }
});