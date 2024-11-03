import {
  View,
  Text,
  Button,
  useColorScheme,
  Appearance,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { useGlobalStates } from "@/global/states";
import { colors } from "@/constants/colors";
import { AmericanHeritage } from "@/search/AmericanHeritage";
import { WebView } from "react-native-webview";
import { OxfordLanguages } from "@/search/OxfordLanguages";
import { MeriamWebster } from "@/search/MeriamWebster";
import { Audio } from "expo-av";
import GroupDefinition from "@/components/group_def";
import SingleDefinition from "@/components/single_def";
import { Feather } from "@expo/vector-icons";

export default function Translate() {
  let colorScheme = useColorScheme();
  const loadCalled = useRef(false);
  const webviewRef = useRef(null);
  const [data, setData] = useState<any>({});
  const { source, word } = useGlobalStates();
  const [resFound, setResFound] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState(
    "https://duckduckgo.com/?q=define+hello&ia=web"
  );

  const sourcekp = {
    oxford: "Oxford Languages",
    meriam: "Meriam Webster",
    amher: "American Heritage 5th Ed",
  };

  const theUrls: Record<string, string> = {
    oxford: `https://www.google.com/search?q=define+${word}`,
    amher: `https://duckduckgo.com/?q=define+${word}&ia=web`,
    meriam: `https://www.merriam-webster.com/dictionary/${word}`,
  };

  const theFuncs: Record<string, () => void> = {
    oxford: getOxfordLanguages,
    amher: getAmericanHeritage,
    meriam: getMeriamWebster,
  };

  function handleMessage(event) {
    const response = JSON.parse(event.nativeEvent.data);
    if (response.type != "notfound") {
      setResFound(true);
      if (
        (typeof response.example == "string" &&
          !response.example.includes("\n")) ||
        typeof response.example == "undefined"
      ) {
        setData((prev) => ({
          ...prev,
          [response.type]: [...(prev[response.type] || []), response],
        }));
      }
    } else {
      setResFound(false);
      setData([{ example: "", meaning: "No Results" }]);
    }
  }

  function getAmericanHeritage() {
    if (loadCalled.current === false) {
      loadCalled.current = true;
      AmericanHeritage(webviewRef);
    }
  }
  function getMeriamWebster() {
    if (loadCalled.current === false) {
      loadCalled.current = true;
      MeriamWebster(webviewRef);
    }
  }
  function getOxfordLanguages() {
    if (loadCalled.current === false) {
      loadCalled.current = true;
      OxfordLanguages(webviewRef);
    }
  }
  //https://duckduckgo.com/?q=define+${word}&ia=web
  useEffect(() => {
    setData([]);
    setSelectedUrl(theUrls[source]);
  }, []);

  const [canPlay, setCanPlay] = useState(true);
  async function playSound() {
    setCanPlay(false);
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    const sound = new Audio.Sound();

    await sound.loadAsync({
      uri: `https://translate.google.com/translate_tts?ie=UTF-8&q=${word}&tl=en&client=tw-ob`,
    });

    await sound.playAsync();
    setTimeout(() => {
      setCanPlay(true);
    }, 1500);
  }

  return resFound ? (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors[colorScheme].primary }}
    >
      <WebView
        containerStyle={{ width: 0, height: 0, position: "absolute" }}
        ref={webviewRef}
        source={{ uri: selectedUrl }}
        onMessage={handleMessage}
        onLoadEnd={theFuncs[source]}
        mediaPlaybackRequiresUserAction={true}
        onShouldStartLoadWithRequest={(req) => {
          if (req.url.startsWith("about")) {
            return false;
          }
          return true;
        }}
        originWhitelist={["*"]}
      />

      <View style={styles.topbar}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.word, { color: colors[colorScheme].text }]}>
            {word.trim()}
          </Text>
          <Text
            style={[
              styles.source,
              { color: colorScheme == "dark" ? "#9E9E9E" : "#686868" },
            ]}
          >
            {sourcekp[source]}
          </Text>
        </View>
        <View
          style={{
            width: 61,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={
              Object.keys(data).length > 0 && resFound && canPlay ? 0.3 : 1
            }
            onPress={
              Object.keys(data).length > 0 && resFound && canPlay
                ? playSound
                : () => {}
            }
          >
            <View
              style={{
                borderRadius: 50,
                backgroundColor:
                  Object.keys(data).length > 0 && resFound
                    ? colors[colorScheme].secondary
                    : "#C6C6C6",
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather
                name="headphones"
                size={30}
                color={
                  Object.keys(data).length > 0 && resFound
                    ? colors[colorScheme].text
                    : "#656565"
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {Object.keys(data).map((key) => (
        <GroupDefinition key={key} wordtype={key}>
          {data[key].map(
            (val: { meaning: string; example?: string }, index: number) => (
              <SingleDefinition
                meaning={val.meaning}
                order={index + 1}
                example={val.example}
              />
            )
          )}
        </GroupDefinition>

        /*<View key={key} style={{ backgroundColor: "#A800FF" }}>
          <Text>Type: {key}</Text>
          {data[key].map((val, index) => (
            <View key={index} style={{ backgroundColor: "#fff", marginTop: 5 }}>
              <Text>Meaning: {val.meaning}</Text>
              <Text>Example: {val.example}</Text>
            </View>
          ))}
        </View>*/
      ))}

      <Link
        style={{ color: "#636363", marginLeft: 25, marginTop: 20 }}
        href="/home"
      >
        Go to Home
      </Link>
    </ScrollView>
  ) : (
    <View>
      <Text>No Results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    marginHorizontal: 25,
    flexDirection: "row",
    height: 61,
    marginTop: 40,
    marginBottom: 10,
  },
  word: {
    color: "#000",
    fontSize: 35,
    fontFamily: "Inter_500Medium",
  },
  source: {
    color: "#686868",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
