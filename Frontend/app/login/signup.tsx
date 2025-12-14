import React,{ useState } from "react";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";


export default function SignupScreen() {
    const navigation = useNavigation();
    return (
        <ThemedText>Sign Up Screen</ThemedText>
    );
}