import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Appearance,
  useColorScheme,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TabBarButton from "./tabBarButton";
import { usePathname, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { useGlobalStates } from "@/global/states";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const pathname = usePathname();
  const posAnim = useSharedValue(0);
  let colorScheme = useColorScheme();

  useEffect(() => {
    posAnim.value = withSpring(
      ["/home/translate", "/home/dicts"].includes(pathname) ? 1 : 0
    );
  }, [state]);

  const tabBgLStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      posAnim.value,
      [0, 1],
      [colors["light"].secondary, colors["light"].primary]
    );
    return { backgroundColor };
  });

  const tabBgDStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      posAnim.value,
      [0, 1],
      [colors["dark"].secondary, colors["dark"].primary]
    );
    return { backgroundColor };
  });

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const buttonWidth = dimensions.width / state.routes.length;
  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
    tabBarPositionX.value = buttonWidth;
  };
  const tabBarPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      posAnim.value,
      [0, 1],
      [colors[colorScheme].primary, colors[colorScheme].secondary]
    );
    return {
      transform: [{ translateX: tabBarPositionX.value }],
      backgroundColor,
    };
  });
  const moveBars = useAnimatedStyle(() => {
    const opacity = interpolate(posAnim.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });
  return (
    <>
      <Animated.View
        style={[
          styles.tabBackground,
          colorScheme == "dark" ? tabBgDStyle : tabBgLStyle,
        ]}
      >
        <Animated.View
          onLayout={onTabBarLayout}
          style={[
            styles.tabbar,
            colorScheme == "dark" ? tabBgDStyle : tabBgLStyle,
          ]}
        >
          <Animated.View
            style={[
              animatedStyle,
              {
                position: "absolute",
                backgroundColor: "#fff",
                borderRadius: 45,
                marginHorizontal: 12,
                height: buttonWidth - 25,
                width: buttonWidth - 25,
              },
            ]}
          />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              tabBarPositionX.value = withSpring(buttonWidth * index, {
                duration: 750,
              });
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={isFocused ? "#673ab7" : "#222"}
                label={label}
              />
            );
          })}
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    paddingVertical: 25,
    borderRadius: 35,
  },
  tabBackground: {
    width: "100%",
    height: 150,
    alignItems: "center",
  },
});
