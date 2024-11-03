import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Appearance,
} from "react-native";
import React, { ReactNode } from "react";

type MyProps = {
  children: ReactNode;
  wordtype: string;
};

export default function GroupDefinition(props: MyProps) {
  let colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.wordtype,
          { color: colorScheme == "dark" ? "#9E9E9E" : "#626262" },
        ]}
      >
        {props.wordtype}
      </Text>
      <View style={{ marginRight: 50 }}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginTop: 10,
  },
  wordtype: {
    fontFamily: "Inter_500Regular",
    marginBottom: 8,
  },
});
