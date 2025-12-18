import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {

  useEffect(() => {
    const checkAuth = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        router.replace("/(tabs)/home");
      }
    };

    checkAuth();
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/signin" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
