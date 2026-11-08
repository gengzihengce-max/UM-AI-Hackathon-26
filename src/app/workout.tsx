import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Screen, Heading, Txt, Button, Kicker, space } from "../components/ui";
import { Cloud } from "../components/art";
import { WorkoutCards } from "../components/workout-cards";
import { useApp } from "../lib/store";
import { C } from "../lib/theme";
export default function Workout() {
  const { plan } = useApp();
  if (plan.games.length && plan.done.length === plan.games.length)
    return (
      <Screen back>
        <View style={{ alignItems: "center" }}>
          <Cloud size={140} />
        </View>
        <Heading>Session complete!</Heading>
        <Txt>All three games are done. Your progress is saved.</Txt>
        {space(24)}
        <Button onPress={() => router.replace("/complete")}>
          See your achievement
        </Button>
      </Screen>
    );
  return (
    <Screen back>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Cloud size={130} thinking />
      </View>
      <Kicker>Daily recommendations</Kicker>
      {space(10)}
      <Heading
        sub={
          plan.done.length
            ? "Game 1 is done. Your next game is ready."
            : "Tap your game to start. The next ones are a surprise."
        }
      >
        {plan.done.length ? "Nice work!" : "Today’s workout"}
      </Heading>
      {space(20)}
      <WorkoutCards />
      {space(16)}
      <Txt size={12} color={C.muted}>
        Why these games? They add variety to the record. Your ratings and hidden
        choices shape future offers.
      </Txt>
      {space(20)}
      <Button tone="ghost" onPress={() => router.replace("/(tabs)")}>
        End session for now
      </Button>
    </Screen>
  );
}
