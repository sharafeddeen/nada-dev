import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupScreen ({navigation}) {

  / --- state variables for:    essential attributes of user signup --- /
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);


  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Look at you all signed up and stuff!")
    })
    .catch((error) => {
      console.log("Error but don't worry -- wer're working on it!")
      console.log(error);
    });

  return (
    <View style={styles.container}>
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
          placeholder="not your birthday"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.button} 
        onPress={ () => 
          navigation.navigate('BottomTab')
        }>
        <Text style={styles.buttonText}>Create Profile</Text>
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
    backgroundColor: 'orange', 
    textAlign: 'center',        
    height: 50,
    alignSelf: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
  }
});