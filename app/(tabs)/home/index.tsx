import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Appearance,
  useColorScheme,
  Text,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useFocusEffect, useRouter } from "expo-router";
import SelectBar from "@/components/selectBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalStates } from "@/global/states";
import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import SkeletonPlaceholder from "@james-kirawan/expo-skeleton-placeholder";

export default function Home() {
  const { simpleSetSelectables, setSource, setWord } = useGlobalStates();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const router = useRouter();
  const [suggest, setSuggest] = useState<string | boolean>("");
  let colorScheme = useColorScheme();
  const checkFirstTime = useCallback(async () => {
    const firstTime = await AsyncStorage.getItem("isFirstTime");
    if (!firstTime) {
      router.navigate("/home/terms");
    } else {
      const mySelects = await AsyncStorage.getItem("mySelects");
      if (!mySelects) {
        await AsyncStorage.setItem(
          "mySelects",
          JSON.stringify(["oxford", "amher", "meriam"])
        );
        simpleSetSelectables(["oxford", "amher", "meriam"]);
      } else {
        simpleSetSelectables(JSON.parse(mySelects));
        setSource(JSON.parse(mySelects)[0]);
      }
    }
  }, []);

  useEffect(() => {
    checkFirstTime();
  }, []);

  const handlePress = () => {
    if (isFocused) {
      inputRef.current.blur();
      setValue("");
      setIsFocused(false);
    } else {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  useEffect(() => {
    setSuggest("");
    if (value.length > 1) {
      fetch(`https://api.datamuse.com/sug?s=${value}&max=1`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const firstSuggestion = data[0].word;
            setSuggest(firstSuggestion);
          } else {
            setSuggest("a");
          }
        })
        .catch((error) =>
          console.error("Error fetching word suggestions:", error)
        );
    }
  }, [value]);

  const submittedInput = () => {
    setWord(value);
    setIsFocused(false);
    setValue("");
    router.push("/home/translate");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: colors[colorScheme].sl }}>
        <KeyboardAvoidingView
          behavior={"height"}
          style={{ flex: 1, backgroundColor: colors[colorScheme].primary }}
          keyboardVerticalOffset={45}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            style={{ flex: 1, paddingBottom: 25 }}
          >
            <TextInput
              returnKeyType="search"
              onSubmitEditing={submittedInput}
              placeholderTextColor={
                isFocused ? "#686868" : colors[colorScheme].plunf
              }
              placeholder={
                !isFocused ? "Find Definitions\nacross the web" : "Define"
              }
              blurOnSubmit={true}
              numberOfLines={1}
              value={value}
              onChangeText={(e) => {
                setValue(e);
              }}
              pointerEvents="none"
              ref={inputRef}
              style={[styles.input, { color: colors[colorScheme].text }]}
              multiline
              autoCapitalize="none"
            />
          </TouchableOpacity>
          {suggest != "a" && isFocused && value.length > 1 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setWord(suggest as string);
                setIsFocused(false);
                setValue("");
                inputRef.current.blur();
                router.navigate("/home/translate");
              }}
            >
              <View
                style={{
                  height: 80,
                  backgroundColor: colors[colorScheme].invert,
                  marginHorizontal: 12.5,
                  borderRadius: 25,
                  marginBottom: 10,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  {suggest == "" ? (
                    <SkeletonPlaceholder
                      backgroundColor={colors[colorScheme].primary}
                      highlightColor={colors[colorScheme].invert}
                      borderRadius={10}
                    >
                      <View style={{ width: 150, height: 25 }} />
                    </SkeletonPlaceholder>
                  ) : (
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors[colorScheme].text,
                        fontFamily: "Inter_400Regular",
                      }}
                    >
                      Did you mean?
                    </Text>
                  )}

                  <View style={{ height: 4 }} />
                  {suggest == "" ? (
                    <SkeletonPlaceholder
                      backgroundColor={colors[colorScheme].primary}
                      highlightColor={colors[colorScheme].invert}
                      borderRadius={10}
                    >
                      <View style={{ width: 200, height: 26 }} />
                    </SkeletonPlaceholder>
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors[colorScheme].text,
                        fontFamily: "Inter_400Regular",
                        letterSpacing: "-0.15",
                      }}
                    >
                      {suggest}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    width: 50,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: colors[colorScheme].secondary,
                      borderRadius: 45,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather
                      name="arrow-right"
                      color={colors[colorScheme].text}
                      size={28}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              height: (Dimensions.get("window").width * 65) / 430 + 20,
              paddingBottom: 10,
            }}
          >
            <SelectBar myRef={inputRef} sv={setValue} sf={setIsFocused} />
          </View>
        </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  input: {
    fontSize: 23,
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 25,
    marginTop: 40,
  },
});
