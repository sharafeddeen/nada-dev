import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'

const Card2 = () => {
    return(
        <View style={styles.cardContainer}>
            <Text style={styles.bioTitle}>Bio:</Text>
            <View style={{height: 80}}>
                <Text style={styles.bioText}>I love driving cars and acting. I want friends and love to drink coffee. I am an actor in the famous fast and furious franchise. I died in 2013 from a car accident.</Text>
            </View>
            <View style={{height: 250}}>
            <Text style={styles.act}>Activties: </Text>
            <Text style={styles.actText}>Driving, Coffee, Drinking, Partying, Eating</Text>
            </View>
        </View>
    );
};
const radius = 20;
const styles = StyleSheet.create({
    cardContainer:{
        justifyContent: 'center',
        width: '26%',
        backgroundColor: '#add8e6',
        borderRadius: radius,
        height: 505,
        left: "12%", 
        top: ".5%"
    },
    bioTitle:{
        fontSize: 25,
        left: "7%",
        top: "-8%",
        fontWeight: 'bold'
    },
    bioText:{
        backgroundColor: 'white',
        fontSize: 15,
        width: '75%',
        top: "-40%",
        left: "8%",
        height: 100,
        borderRadius: 10
    },
    act:{
        fontSize: 25,
        left: "8%",
        top: "-3%",
        fontWeight: 'bold'
    },
    actText:{
        backgroundColor: 'white',
        fontSize: 15,
        width: 250,
        top: "0%",
        left: "8%",
        height: 75,
        borderRadius: 10
    }
});
export default Card2;