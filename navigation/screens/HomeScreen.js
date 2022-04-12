import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slideshow from '../components/SlideShow';
export default function HomeScreen ({navigation}) {
    return (
      <View style={styles.container}>
        < Slideshow></Slideshow>
            <TouchableOpacity style={styles.wink}>
                <Text style={styles.text}> Wink</Text>
            </TouchableOpacity>
      </View>
    );
  }

  const radius = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange', 
    textAlign: 'center',        
    height: 50, 
},
wink:{
  backgroundColor: '#ffff00',
  bottom: '-1%',
  width: '50%',
  borderRadius: radius,
  height: 55,
  textAlign: 'center'
}, 
text:{
  textAlign: 'center',
  fontSize: 40,
  fontWeight: 'bold'
}
});