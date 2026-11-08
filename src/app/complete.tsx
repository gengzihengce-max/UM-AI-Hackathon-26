import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Txt,
  Heading,
  Card,
  Button,
  Row,
  Icon,
  space,
} from "../components/ui";
import { C, GAME_INFO } from "../lib/theme";
import { useApp } from "../lib/store";
export default function Complete() {
  const { plan } = useApp();
  return (
    <Screen help={false}>
      <View style={{ alignItems: "center", marginVertical: 36 }}>
        <View
          style={{
            width: 124,
            height: 124,
            borderRadius: 62,
            backgroundColor: C.amber,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="trophy-outline" size={65} />
        </View>
      </View>
      <Heading>Session complete!</Heading>
      <Txt>
        {plan.done.length} of {plan.games.length} games in this workout.
      </Txt>
      {space(20)}
      {plan.done.map((g) => (
        <Row key={g} style={{ marginBottom: 12 }}>
          <Icon name="checkmark-circle" color={C.green} />
          <Txt>{GAME_INFO[g].area} added</Txt>
        </Row>
      ))}
      {space(15)}
      <Card color={C.pale}>
        <Row>
          <Icon name="trophy-outline" size={35} />
          <View style={{ flex: 1 }}>
            <Txt weight="extra">New achievement</Txt>
            <Txt>Three-game session</Txt>
          </View>
        </Row>
      </Card>
      {space(16)}
      <Txt size={12}>A reward for showing up. Never for a high score.</Txt>
      {space(28)}
      <Button tone="coral" onPress={() => router.replace("/(tabs)")}>
        Back to Home
      </Button>
      {space(12)}
      <Button tone="pale" onPress={() => router.replace("/(tabs)/journey")}>
        See my journey
      </Button>
    </Screen>
  );
}
