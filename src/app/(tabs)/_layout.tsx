import React from "react";
import { View, Pressable } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { C } from "../../lib/theme";
import { Icon, Txt } from "../../components/ui";
export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <View
          style={{
            position: "absolute",
            bottom: Math.max(14, insets.bottom),
            left: 16,
            right: 16,
            borderRadius: 38,
            backgroundColor: C.ink,
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 4,
            shadowColor: C.ink,
            shadowOpacity: 0.15,
            shadowRadius: 18,
            elevation: 7,
          }}
        >
          {state.routes.map((route, index) => {
            const labels = ["Home", "Journey", "Stats", "Account"],
              icons = [
                "home-outline",
                "trail-sign-outline",
                "stats-chart-outline",
                "person-outline",
              ],
              selected = state.index === index;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={labels[index]}
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={{
                  flex: 1,
                  minHeight: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Icon name={icons[index]} size={23} color={C.white} />
                <Txt
                  size={11}
                  weight={selected ? "extra" : "medium"}
                  color={C.white}
                >
                  {labels[index]}
                </Txt>
                {selected && (
                  <View
                    style={{
                      position: "absolute",
                      top: -6,
                      width: 5,
                      height: 5,
                      borderRadius: 3,
                      backgroundColor: C.blue,
                    }}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="journey" />
      <Tabs.Screen name="stats" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
