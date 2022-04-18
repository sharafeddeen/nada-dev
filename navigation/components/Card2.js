import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'

const Card2 = ({bio, activities}) => {
    return(
        <View style={styles.cardContainer}>
            <Text style={styles.bioTitle}>Bio:</Text>
            <View style={{height: 80}}>
                <Text style={styles.bioText}>{bio}</Text>
            </View>
            <View style={{height: 250}}>
            <Text style={styles.act}>Activties: </Text>
            <Text style={styles.actText}>{activities}</Text>
            </View>
        </View>
    );
};
const radius = 20;
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    cardContainer:{
        justifyContent: 'center',
        width: deviceWidth,
        backgroundColor: '#add8e6',
        borderRadius: radius,
        height: 500,
        top: '1%'
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
        width:"75%",
        left: "8%",
        height: 75,
        borderRadius: 10
    }
});
export default Card2;