import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen ({navigation}) {

  / --- state variables for:    essential attributes of user signup --- /
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  let user = null;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      console.log("user logged in successfully!")
    })
    .catch((error) => {
      console.log("Error during login")
      console.log(error);
    });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>It's been a long day without you my friend</Text>

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
          //navigation.navigate('BottomTab')
          console.log(user)
        }>
        <Text style={styles.buttonText}>Push me daddy!</Text>
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