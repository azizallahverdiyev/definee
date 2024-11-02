import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  useColorScheme,
  Appearance,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalStates } from "@/global/states";
import { colors } from "@/constants/colors";

export default function SelectButton({
  photo,
  dict,
}: {
  photo: string;
  dict: string;
}) {
  const {
    source,
    setSource,
  }: { source: string; setSource: (selected: string) => void } =
    useGlobalStates();
  let colorScheme = useColorScheme();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setSource(dict)}>
      <View
        style={[
          styles.buttonContainer,
          {
            width: (Dimensions.get("window").width * 65) / 430 - 2,
            height: (Dimensions.get("window").width * 65) / 430 - 2,
            backgroundColor:
              source == dict
                ? colors[colorScheme].secondary
                : colors[colorScheme].invert,
          },
        ]}
      >
        <Image
          source={photo as ImageSourcePropType}
          style={{ width: "70%", height: "70%", resizeMode: "contain" }}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 2,
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
