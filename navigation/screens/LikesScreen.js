import * as React from 'react';
import {StyleSheet, View, FlatList,Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import exampleImage from '../Assets/paul.jpg'


export default function LikesScreen({navigation}){
    const [likes, setLikes] = React.useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}]);


    //rendering each like card 
    const renderItem = ({item, index}) => {
        return(
        <View style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={exampleImage}/>
            <Text style={styles.name}>Vin Diesel</Text>
            <Text style={styles.bio}>Bio: You can do anything with family and I love to drive</Text>
            <Text style={styles.activities}>Activies: Bowling, Driving, Drinking</Text>
            <TouchableOpacity style={styles.wink} onPress={()=>match(keyIndex)}>
                <Text>Let's Hangout</Text>
            </TouchableOpacity>
        </View>
        )
    }
    let keyIndex;
    const match = (index) => {

        const filteredLikes= likes.filter(item => item.id !== index);
    
        setLikes(filteredLikes);
            
    }
    if(likes.length > 0){
        return(
            <View style={{flex: 1}}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={likes}
                renderItem={renderItem}
                keyExtractor={item => keyIndex = item.id}
                />            
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>
                <Text style={styles.nomoretext}>Hmm. You either don't like people or you really do like to talk to everyone</Text>
            </View>
        )
    }
    
}
const radius = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardContainer:{
        flex: 1,
        width: '95%',
        height: '100%',
        backgroundColor: '#add8e6',
        borderRadius: radius,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 25,
        marginTop: 20,
        marginBottom: 20, 
    },
    imageStyle: {
        height: "100%",
        width: '45%',
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius
    },
    name: {
        width:"25%",
        fontSize: 15, 
        fontWeight: 'bold',
        left: "10%",
        top: "-30%",
        backgroundColor: 'white', 
        textAlign: 'center',
        borderRadius: radius
    },
    bio: {
        width: "50%",
        fontSize: 12, 
        left: "46%",
        top: "-90%"
    },
    activities: {
        width: 150,
        fontSize: 12, 
        left: "46%",
        top:"-90%"
    },
    wink: {
        backgroundColor: '#ffff00', 
        width: '30%',
        left: "46%",
        top: "-175%",
        borderRadius: 20,
    },
    nomoretext:{
        fontSize: 25,
        textAlign: 'center',
        margin: 20
    
      },
});