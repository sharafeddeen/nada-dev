import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function LoadScreen ({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to Nada!</Text>

        <Text style={styles.text}>Been here before?</Text>
        <TouchableOpacity style={styles.submit} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Just log in already!</Text>
        </TouchableOpacity>

        <Text style={styles.text}>What is this?</Text>
        <TouchableOpacity style={styles.submit} onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.buttonText}>Sign up and find out!</Text>
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
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    marginTop: 100,
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'darkslategray',
    textAlign: 'center'
  },
  text: {
    marginTop: 50,
    fontSize: 20,
    color: 'darkslategray',
    textAlign: 'center'
  },
  submit: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#add8e6', 
    borderRadius: 20,
    textAlign: 'center',        
},
buttonText: {
  //fontWeight: 'bold',
  color: 'black',
  fontSize: 25,
}
});