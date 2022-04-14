import React from 'react'
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import exampleImage from '../Assets/paul.jpg'
var name = "Paul Walker"

const Card1 = () => {
    return(
        <View style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={exampleImage}/>
            <Text style={styles.name}>{name}</Text>
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
        borderRadius: radius, 
        marginBottom: 40,
    },
    imageStyle: {
        height: 500,
        width: '100%',
        borderRadius: radius,
        top: "5%",
        left: "7%"
        },
    name: {
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold',
        backgroundColor: 'white', 
        width: '50%', 
        borderRadius: radius, 
        bottom: "10%",
        left: "5%"
    },
});
export default Card1;