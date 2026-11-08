import React from "react";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useApp } from "../lib/store";
export default function Index() {
  const { prefs, ready } = useApp();
  if (!ready)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  return <Redirect href={prefs.onboarded ? "/(tabs)" : "/onboarding/0"} />;
}
