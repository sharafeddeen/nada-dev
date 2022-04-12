import * as React from 'react';
import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LikesScreen from './screens/LikesScreen';
import ChatScreen from './screens/ChatScreen';
//Screen Names
const profilesName = 'People';
const likesName = 'Reactions';
const personalName = 'Personal Profile';
const chatName = 'Chat'

const Tab = createBottomTabNavigator();

export default function Tabs ({navigation}) {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={profilesName}
                screenOptions={({route}) =>({
                    tabBarIcon: ({focused,color, size}) =>{
                        let iconName;
                        let rn = route.name;

                        if(rn === profilesName){
                            iconName = focused ? 'people' : 'people-outline'
                        } else if( rn == likesName){
                            iconName = focused ? 'heart' : 'heart-outline'
                        } else if(rn == personalName){
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        } else if(rn == chatName){
                            iconName = focused ? 'people' : 'people-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={"blue"}/>
                    },
                })}>
                <Tab.Screen name={profilesName} component={HomeScreen}/>
                <Tab.Screen name={likesName} component={LikesScreen}/>
                <Tab.Screen name={personalName} component={ProfileScreen} />
                <Tab.Screen name={chatName} component={ChatScreen} />
            </Tab.Navigator>
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
});