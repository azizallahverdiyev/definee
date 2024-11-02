import { View, Text, useColorScheme, Appearance } from "react-native";
import React, { useCallback } from "react";
import { colors } from "@/constants/colors";
import SettingsBar from "@/components/settingsBar";

export default function Settings() {
  let colorScheme = useColorScheme();
  const settingsData = [
    { title: "Version 1.0", sub: "Github Repo: https://github.com/definee" },
    {
      title: "Ask for removal of a source",
      sub: "Contact me at azizallahverdiyev712@gmail.com",
    },
    {
      title: "Help the project",
      sub: "Donate in the Coffee tab",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: colors[colorScheme].primary, flex: 1 }}>
        <Text
          style={{
            color: colors[colorScheme].text,
            fontSize: 23,
            fontFamily: "Inter_500Medium",
            marginLeft: 20,
            marginBottom: 25,
            marginTop: 45,
          }}
        >
          Settings
        </Text>
        <View style={{ flex: 1 }}>
          {settingsData.map((val, index) => (
            <SettingsBar key={index} order={index} {...val} />
          ))}
        </View>
      </View>
      <View style={{ minHeight: 100 }}>
        <View
          style={[
            {
              backgroundColor: colors[colorScheme].sl,
              height: 50,
            },
          ]}
        />
        <View
          style={[{ backgroundColor: colors[colorScheme].fl, height: 50 }]}
        />
      </View>
    </View>
  );
}
