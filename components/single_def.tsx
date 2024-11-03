import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Appearance,
} from "react-native";
import React from "react";
import { colors } from "@/constants/colors";

type MyProps = {
  meaning: string;
  example?: string;
  order: number;
};

export default function SingleDefinition(props: MyProps) {
  let colorScheme = useColorScheme();
  return (
    <View style={{ flexDirection: "row", marginBottom: 8 }}>
      <Text style={[styles.order, { color: colors[colorScheme].text }]}>
        {props.order}.
      </Text>
      <View style={styles.container}>
        <Text style={[styles.meaning, { color: colors[colorScheme].text }]}>
          {props.meaning}
        </Text>
        {props.example && (
          <Text
            style={[
              styles.example,
              { color: colorScheme == "dark" ? "#9E9E9E" : "#686868" },
            ]}
          >
            {props.example}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  order: {
    fontFamily: "Inter_400Regular",
    fontSize: 18,
    width: 25,
    textAlign: "right",
  },
  container: {
    paddingTop: 4,
    fontSize: 14,
    paddingLeft: 5,
  },
  meaning: {
    fontFamily: "Inter_500Medium",
    marginBottom: 1,
  },
  example: {
    fontFamily: "Inter_400Regular",
  },
});
