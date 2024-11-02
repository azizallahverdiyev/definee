import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Terms() {
  const router = useRouter();
  return (
    <View>
      <Text>Terms and Conditions</Text>
      <Button
        title="Agree"
        onPress={async () => {
          await AsyncStorage.setItem("isFirstTime", "true");
          router.replace("/home");
        }}
      />
    </View>
  );
}
