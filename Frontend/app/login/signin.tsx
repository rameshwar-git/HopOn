import React , {useState}from "react";
import {View, StyleSheet, Button } from "react-native";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";    
import TextInputComponent from "@ui/textinput";
import { Card }  from "react-native-paper";
import ButtonComponent from "@/components/button";

export default function SigninScreen() {
    const navigatrion = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <View>
        <Card style={styles.card}>
         <TextInputComponent
            placeholderText="Email | Username"
            onChangeText={setEmail}
            value={email}
            inputAccessoryViewID="emailInput"
        />
        <TextInputComponent 
            placeholderText="Password"
            inputAccessoryViewID="passwordInput"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}/>  
        <ButtonComponent
            title="Sign In"
            isDisabled={email.length === 0 || password.length === 0}
            onPress={() => {
                console.log("Signing in with", email, password);
            }}
        />
        <ButtonComponent
            title="Sign Up"
            onPress={() => navigatrion.navigate("login/signup" as never)}
        />
        </Card>
       </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    outline : {
        boxSizing: 'border-box',
        backgroundColor: 'steelblue',
        borderColor: '#61e0e9ff',
        borderWidth: 4,
        alignContent: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'center',
        elevation: 10,
    },
    card: {
        width: '90%',
        margin:10,
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly',  
        borderRadius: 15,
        elevation: 20,
        shadowColor: '#2200ffff',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.84,
    }
});