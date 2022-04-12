import * as React from 'react'
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native'
import exampleImage from '../Assets/paul.jpg'


function ChatCard({navigation}){

    return(
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Image style={styles.imageStyle} source={exampleImage} />
                <Text style={styles.name}>Vin Diesel</Text>
                <Text style={styles.message}>You can do anything with family and I love to drive</Text>
            </TouchableOpacity>
        </View>
    );
};

const radius = 20;
const styles = StyleSheet.create({
    cardContainer:{
        width: "95%",
        backgroundColor: '#add8e6',
        height: 100,
        borderRadius: radius,
        margin: 10
    },
    imageStyle: {
        height: 100,
        width: '40%',
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius
    },
    name: {
        width:100,
        fontSize: 15, 
        fontWeight: 'bold',
        left: '45%',
        bottom: 90
    },
    message: {
        width: '50%',
        fontSize: 12, 
        height: 50, 
        left: '45%',
        bottom: 90,
        backgroundColor: 'white',
        borderRadius: 10
    },
});
export default ChatCard;