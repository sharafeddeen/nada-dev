import * as React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, SafeAreaView, StatusBar, TouchableWithoutFeedback} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatTwoScreen(){
    const [input, setInput] = React.useState("");

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height" }
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <>
                <ScrollView>{/*Chat goes here*/ }</ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        placeholder="Send Message"
                        style={styles.textInput}
                    >
                        
                    </TextInput>
                    <TouchableOpacity activeOpacity={0.5} >
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                    </TouchableOpacity>

                </View>
                </>

            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1  
    }, 
    footer:{
        flexDirection: "row",
        alignItems: "center",
        width:"100%",
        padding: 15, 
    },
    textInput: {
       bottom: 0,
       height: 40,
       flex: 1,
       marginRight: 15,
       backgroundColor: "#ECECEC",
       padding: 10,
       color: "grey",
       borderRadius: 30, 
    },
   
});