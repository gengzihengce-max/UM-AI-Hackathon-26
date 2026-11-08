import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { AppProvider } from "../lib/store";
import { C } from "../lib/theme";
export default function Layout() {
  const [fonts, error] = useFonts({
    Jakarta: PlusJakartaSans_400Regular,
    JakartaMedium: PlusJakartaSans_500Medium,
    JakartaBold: PlusJakartaSans_700Bold,
    JakartaExtra: PlusJakartaSans_800ExtraBold,
  });
  if (!fonts && !error)
    return (
      <View
        style={{ flex: 1, backgroundColor: C.white, justifyContent: "center" }}
      >
        <ActivityIndicator color={C.ink} />
      </View>
    );
  return (
    <SafeAreaProvider>
      <AppProvider>
        <View style={{flex:1,width:"100%",maxWidth:Platform.OS==='web'?430:undefined,alignSelf:"center"}}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: C.white },
            animation: "fade",
          }}
        />
        </View>
      </AppProvider>
    </SafeAreaProvider>
  );
}
