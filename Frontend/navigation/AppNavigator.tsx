import React from "react";
import { Stack } from "expo-router";

import SignupScreen from "@/app/login/signup";

<Stack.Navigator>
    <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: "Sign Up" }} />
</Stack.Navigator>