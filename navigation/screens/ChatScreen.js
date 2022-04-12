import * as React from 'react';
import {View, ScrollView} from 'react-native';
import ChatCard from "../components/ChartCard";

export default function ChatScreen({navigation}){
    return(
        <View>
            <ScrollView>
                <ChatCard navigation={navigation}></ChatCard>
            </ScrollView>
        </View>
    );
}