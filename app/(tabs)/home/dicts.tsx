import {
  View,
  Text,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  ColorSchemeName,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { useGlobalStates } from "@/global/states";
import { DragSortableView } from "react-native-drag-sort";
import SourceCard from "@/components/sourceCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, useColorScheme } from "react-native";
import { colors } from "../../../constants/colors";

export default function Dicts() {
  const {
    selectables,
    setSelectables,
  }: {
    selectables: string[];
    setSelectables: (newSelectable: string[]) => void;
  } = useGlobalStates();

  let colorScheme = useColorScheme();
  const [choices, setChoices] = useState(selectables);
  const { width } = Dimensions.get("window");
  const router = useRouter();
  useFocusEffect(useCallback(() => setChoices(selectables), []));
  return (
    <View style={{ flex: 1, backgroundColor: colors[colorScheme].primary }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignSelf: "baseline",
            marginLeft: 20,
            marginBottom: 20,
            marginTop: 25,
          }}
        >
          <Text
            style={{
              color: colors[colorScheme].text,
              fontSize: 23,
              fontFamily: "Inter_500Medium",
              marginTop: 20,
            }}
          >
            Edit Sources
          </Text>
          <Text
            style={{
              color: colors[colorScheme].text,
              fontSize: 15,
              fontFamily: "Inter_400Regular",
            }}
          >
            Hold and Drag to change
          </Text>
          <TouchableOpacity
            onPress={() => router.navigate("/home")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ fontSize: 18, color: "#88cc00" }}>Go back</Text>
          </TouchableOpacity>
        </View>
        <DragSortableView
          dataSource={choices}
          parentWidth={width - 36}
          childrenWidth={width / 3 - 18}
          childrenHeight={90}
          marginChildrenRight={4}
          marginChildrenBottom={6}
          onDataChange={async (data) => {
            setSelectables(data);
            await AsyncStorage.setItem("mySelects", JSON.stringify(data));
          }}
          renderItem={(item, index) => <SourceCard item={item} index={index} />}
        />
      </View>
    </View>
  );
}
