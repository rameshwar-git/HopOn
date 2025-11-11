import * as React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SigninScreen from "./login/signin";
import SignupScreen from "./login/signup";
const Stack = createNativeStackNavigator({
    screens:{
        SignIn:{
            screen: SigninScreen,
            options:{ title: 'Sign In'},
        },
        SignUp: {
            screen: SignupScreen,
            options:{ title: 'Sign Up'},
        },
    },
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
    return <Navigation />;
}