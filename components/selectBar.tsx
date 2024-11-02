import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Appearance,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectButton from "./selectButton";
import { useGlobalStates } from "@/global/states";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { useAssets } from "expo-asset";

export default function SelectBar({ myRef, sv, sf }) {
  const { selectables }: { selectables: string[] } = useGlobalStates();
  const [assets, error] = useAssets([
    require("../assets/images/dict_photos/oxford.png"),
    require("../assets/images/dict_photos/meriam.png"),
    require("../assets/images/dict_photos/dcom.png"),
    require("../assets/images/dict_photos/cambridge.png"),
    require("../assets/images/dict_photos/brittanica.png"),
    require("../assets/images/dict_photos/amher.png"),
    require("../assets/images/plus_dark.png"),
    require("../assets/images/plus_light.png"),
  ]);
  const photos: Record<string, number> = {
    oxford: 0,
    meriam: 1,
    amher: 5,
  };
  const router = useRouter();
  let colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: "row", marginHorizontal: 12.5 }}>
      {assets
        ? selectables
            .filter((val, idx) => idx < 5)
            .map((value, index) => (
              <SelectButton
                key={index}
                photo={assets[photos[value]]}
                dict={value}
              />
            ))
        : null}

      <TouchableOpacity
        onPress={() => {
          myRef.current.blur();
          sv("");
          sf(false);
          router.push("/home/dicts");
        }}
      >
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: colors[colorScheme].secondary,
              width: (Dimensions.get("window").width * 65) / 430 - 2,
              height: (Dimensions.get("window").width * 65) / 430 - 2,
            },
          ]}
        >
          {assets ? (
            <Image
              style={{
                width: "40%",
                height: "40%",
                marginLeft: 1,
                marginTop: 1,
                resizeMode: "cover",
              }}
              source={colorScheme == "dark" ? assets[7] : assets[6]}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 2,
    padding: 5,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 40,
    position: "absolute",
    backgroundColor: "red",
    bottom: 6,
    left: 17,
  },
});
