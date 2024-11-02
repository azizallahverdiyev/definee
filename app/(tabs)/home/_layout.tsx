import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { router, Stack, useFocusEffect, useRouter } from "expo-router";

export default function HomeLayout() {
  const navigator = useRouter();
  useFocusEffect(useCallback(() => router.navigate("/home"), []));
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="terms" options={{ title: "Terms and Conditions" }} />
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="translate"
        options={{ title: "Translation", gestureEnabled: false }}
      />
      <Stack.Screen
        name="dicts"
        options={{ title: "Dictionaries", gestureEnabled: false }}
      />
    </Stack>
  );
}
