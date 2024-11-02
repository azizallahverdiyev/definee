import { View, Text, useColorScheme, Appearance } from "react-native";
import React from "react";
import { colors } from "@/constants/colors";

export default function SettingsBar({
  order,
  title,
  sub,
}: {
  order: number;
  title: string;
  sub: string;
}) {
  let colorScheme = useColorScheme();

  return (
    <View
      style={{
        width: "100%",
        backgroundColor:
          order % 2 == 0 ? colors[colorScheme].poss : colors[colorScheme].negs,
        height: 80,
        justifyContent: "center",
        paddingLeft: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 16,
          marginBottom: 5,
          color: colors[colorScheme].text,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontFamily: "Inter_400Regular", color: "#9E9E9E" }}>
        {sub}
      </Text>
    </View>
  );
}
