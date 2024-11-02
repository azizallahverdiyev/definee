import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  useColorScheme,
  Appearance,
} from "react-native";
import React, { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "@/constants/colors";

type myProps = {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
};

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: myProps) {
  let colorScheme = useColorScheme();
  const AnimatedFeather = Animated.createAnimatedComponent(Feather);

  const icons: Record<string, Function> = {
    home: (props: any) => (
      <AnimatedFeather
        name="home"
        size={28}
        color={colors[colorScheme].text}
        {...props}
      />
    ),
    settings: (props: any) => (
      <AnimatedFeather
        name="settings"
        size={28}
        color={colors[colorScheme].text}
        {...props}
      />
    ),
    coffee: (props: any) => (
      <AnimatedFeather
        name="coffee"
        size={28}
        color={colors[colorScheme].text}
        {...props}
      />
    ),
  };
  const scale = useSharedValue(0);
  const animatedProps = useAnimatedStyle(() => {
    let size = interpolate(scale.value, [0, 1], [1, 1.15]);
    return { transform: [{ scale: size }] };
  });

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0);
  }, [isFocused]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedProps}>{icons[routeName]()}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
