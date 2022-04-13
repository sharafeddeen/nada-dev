import * as React from 'react';
import {useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen ({navigation}) {

  / --- state variables for:    essential attributes of user login --- /
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

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
        onPress={ () => {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log("user logged in successfully!", user)
              navigation.navigate('BottomTab')
            })
            .catch((error) => {
              console.log("Error during login: user is null?", user === null)
              console.log(error);
            });
        }}>
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