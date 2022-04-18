import React from 'react';
import {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Dimensions, Image} from 'react-native'

const Card1 = ({name, image}) => {
    return(
        <View style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={{uri: image}}/>
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};
const radius = 20;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cardContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        width: deviceWidth,
        height: 500,
        borderRadius: radius, 
    },
    imageStyle: {
        height: 500,
        width: '100%',
        borderRadius: radius,
        top: "5%",
        },
    name: {
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold',
        backgroundColor: 'white', 
        width: '50%', 
        borderRadius: radius, 
        bottom: '10%'
    },
});
export default Card1;