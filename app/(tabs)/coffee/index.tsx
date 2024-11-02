import {
  View,
  Text,
  useColorScheme,
  Appearance,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { colors } from "@/constants/colors";
import { openBrowserAsync } from "expo-web-browser";
const llogo = require("../../../assets/images/noBgLogo.png");
const dlogo = require("../../../assets/images/noBgLogo3.png");

export default function Coffee() {
  let colorScheme = useColorScheme();
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
          Donate
        </Text>
        <Text
          style={{
            color: colors[colorScheme].text,
            fontSize: 15,
            fontFamily: "Inter_400Regular",
            marginLeft: 20,
            marginBottom: 15,
          }}
        >
          Show your appreciation by buying me a coffee
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 20, marginBottom: 25 }}
          onPress={async () => openBrowserAsync("https://buymeacoffee.com/")}
        >
          <Text
            style={{
              color: colors[colorScheme].text,
              fontSize: 14,
              fontFamily: "Inter_400Regular",
              textDecorationLine: "underline",
            }}
          >
            https://buymeacoffee.com/azizallahverdiyev
          </Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
        >
          <Image
            style={{ width: 55, height: 55, resizeMode: "contain" }}
            source={colorScheme == "dark" ? dlogo : llogo}
          />
          <Text
            style={{
              color: colors[colorScheme].text,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              marginLeft: 20,
            }}
          >
            Thanks a lot!
          </Text>
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
