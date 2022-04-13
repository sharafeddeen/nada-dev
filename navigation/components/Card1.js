import React from 'react'
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import exampleImage from '../Assets/paul.jpg'
var nameAge = "Paul Walker, 21"

const Card1 = () => {
    return(
        <View style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={exampleImage}/>
            <Text style={styles.name}>{nameAge}</Text>
        </View>
    );
};
const radius = 20;

const styles = StyleSheet.create({
    cardContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        width: '26%',
        height: 500,
        margin: 10,
        top: -10
    },
    imageStyle: {
        height: 500,
        width: '100%',
        borderRadius: radius,
        top: 30
    },
    name: {
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold',
        backgroundColor: 'white', 
        width: '50%', 
        borderRadius: radius, 
        bottom: 35,
    },
});
export default Card1;