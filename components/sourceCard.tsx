import {
  View,
  Text,
  Dimensions,
  Image,
  ImageSourcePropType,
  useColorScheme,
  Appearance,
} from "react-native";
import React from "react";
import { colors } from "@/constants/colors";
const oxford = require("../assets/images/dict_photos/oxford.png");
const meriam = require("../assets/images/dict_photos/meriam.png");
const dcom = require("../assets/images/dict_photos/dcom.png");
const cambridge = require("../assets/images/dict_photos/cambridge.png");
const brittanica = require("../assets/images/dict_photos/brittanica.png");
const amher = require("../assets/images/dict_photos/amher.png");

export default function SourceCard({
  index,
  item,
}: {
  index: number;
  item: string;
}) {
  let colorScheme = useColorScheme();
  const photos: Record<string, string> = {
    oxford,
    meriam,
    amher,
  };
  const names: Record<string, string> = {
    oxford: "Oxford\nLanguages",
    meriam: "Meriam\nWebster",
    amher: "American\nHeritage",
  };
  return (
    <View
      style={{
        backgroundColor:
          index < 5
            ? colors[colorScheme].secondary
            : colors[colorScheme].invert,
        borderRadius: 10,
        height: 90,
        width: Dimensions.get("window").width / 3 - 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={photos[item] as ImageSourcePropType}
          style={{
            width: 35,
            height: 35,
            resizeMode: "contain",
            marginLeft: "8%",
            marginTop: "8%",
          }}
        />
      </View>
      <View
        style={{
          marginBottom: "8%",
          marginLeft: "6%",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 13,
            color: colors[colorScheme].text,
          }}
        >
          {names[item]}
        </Text>
      </View>
    </View>
  );
}
