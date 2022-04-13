import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function SignupScreen ({navigation}) {

  //for profile image
  const [image, setImage] = React.useState(null);
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
      <Text style={styles.headerText}>Other essential information!</Text>
      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>Bio</Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          placeholder="tell us a little bit about yourself"
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.inputHeader}>Activities </Text>
        <TextInput  
          style={styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          placeholder="Seperate each by a ','"
        />
      </View>
    
      <Text style={styles.inputHeader}>Profile Image </Text>
      <Button title="Change Profile Image" style={styles.button} onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
      <TouchableOpacity
        style={styles.button} 
        onPress={ () => 
          navigation.navigate('BottomTab')
        }>
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