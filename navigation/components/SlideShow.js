import * as React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';


const Slideshow = () => {
    const people =[1, 2, 3, 4, 5, 6]

    const renderItem = ({item, index}) => {
        return(
            <ScrollView 
                horizontal= {true}
                decelerationRate={0}
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
    return(
        <View style = {{ alignItems: 'center', justifyContent: 'center', height: '80%'}}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={people}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item}
        decelerationRate= {'normal'}/>
        </View>
    );
}

const styles = StyleSheet.create({ 
    text:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default Slideshow;