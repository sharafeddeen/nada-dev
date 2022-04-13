import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadScreen from './navigation/screens/LoadScreen';
import LoginScreen from './navigation/screens/LoginScreen';
import SignupScreen from './navigation/screens/SignupScreen';
import SignuptwoScreen from './navigation/screens/Signuptwoscreen';
import BottomTab from './navigation/BottomTab';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCV-Wp6n9JYqDd4Dt-y-cWUicuTGU_Ovvs",
  authDomain: "testapp-7a93c.firebaseapp.com",
  databaseURL: "https://testapp-7a93c-default-rtdb.firebaseio.com",
  projectId: "testapp-7a93c",
  storageBucket: "testapp-7a93c.appspot.com",
  messagingSenderId: "304480105424",
  appId: "1:304480105424:web:3b16ec5dd4319cac41ffd5",
  measurementId: "G-X01L9JDR3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//<Stack.Screen name="LoadScreen" component={LoadScreen} />
  //      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //    <Stack.Screen name="SignupScreen" component={SignupScreen} />
      //  <Stack.Screen name="SignuptwoScreen" component={SignuptwoScreen} />
const Stack = createStackNavigator();
export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false, headerLeft: false }} navigation={navigation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
