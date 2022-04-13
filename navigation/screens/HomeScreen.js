import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';

export default function HomeScreen ({navigation}) {

  const people =[1, 2, 3, 4]

  const renderItem = ({item, index}) => {
      return(
          <ScrollView 
              horizontal= {true}
              decelerationRate={200}
              snapToInterval={0}
              snapToAlignment={"start"}
              alwaysBounceHorizontal={true}
              showsHorizontalScrollIndicator={false}
              contentInset={{
              top: 0,
              left: 35,
              bottom: 0,
              right: 30,
          }}>
          <Card1></Card1>
          <Card2></Card2>
          </ScrollView>
      )
  }
    return (
      <View style={styles.container}>
          <View style = {{ alignItems: 'center', justifyContent: 'center', height: '82%'}}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={people}
            renderItem={renderItem}
            pagingEnabled
            keyExtractor={item => item}
            decelerationRate= {'normal'}/>
          </View>            
          <TouchableOpacity style={styles.wink}>
            <Text style={styles.text}> Let's Hangout</Text>
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
  width: '75%',
  borderRadius: radius + 10,
  height: 55,
  textAlign: 'center'
}, 
text:{
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold'
}
});