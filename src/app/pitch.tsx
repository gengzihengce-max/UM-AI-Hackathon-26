import React from "react";
import { View, Linking } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Card,
  Button,
  Chips,
  Kicker,
  space,
} from "../components/ui";
import { useApp, YEAR, DEMO_PROFILE } from "../lib/store";
import { C, GAME_INFO, GAME_IDS, GameId } from "../lib/theme";
export default function Pitch() {
  const { patch, setPlan, month, setMonth, resetPitch } = useApp();
  function home(state: number) {
    patch(DEMO_PROFILE);
    setPlan({
      games: ["memory", "words", "voyage"],
      done:
        state === 2
          ? ["memory", "words", "voyage"]
          : state === 1
            ? ["memory", "words"]
            : [],
      started: state > 0,
    });
    router.replace("/(tabs)");
  }
  return (
    <Screen back>
      <Kicker>Presentation controls · not a clinical tool</Kicker>
      {space(10)}
      <Heading sub="Move through the reference workflow without replaying every game during the pitch.">
        Ready for your pitch.
      </Heading>
      {space(18)}
      <Card color={C.pale}>
        <Txt weight="extra">Home’s three states</Txt>
        <Button tone="coral" onPress={() => home(0)}>
          1 · Start playing
        </Button>
        <Button tone="blue" onPress={() => home(1)}>
          2 · Continue workout
        </Button>
        <Button tone="amber" onPress={() => home(2)}>
          3 · Congratulations
        </Button>
      </Card>
      {space(18)}
      <Txt weight="extra">Scripted status state</Txt>
      <Chips
        options={["Steady · Jun", "Review · Oct"]}
        value={month >= 9 ? "Review · Oct" : "Steady · Jun"}
        onSelect={(v: string) => setMonth(v.startsWith("Review") ? 11 : 7)}
      />
      <Txt size={12}>
        These are authored synthetic scenarios. The app is not detecting risk or
        assigning a health category.
      </Txt>
      {space(20)}
      <Button tone="pale" onPress={() => router.push("/year-demo")}>
        Open synthetic-year replay
      </Button>
      {space(10)}
      <Button tone="pale" onPress={() => router.push("/report")}>
        Open AI-authored report
      </Button>
      {space(20)}
      <Txt weight="extra">Show a synthetic result</Txt>
      {space(12)}
      {GAME_IDS.map((id) => (
        <Button
          key={id}
          small
          tone="pale"
          style={{ marginBottom: 10 }}
          onPress={() =>
            router.push({ pathname: "/result", params: { sample: id } })
          }
        >
          {GAME_INFO[id].title}
        </Button>
      ))}
      {space(16)}
      <Button tone="ghost" onPress={() => router.push("/onboarding/0")}>
        Walk through onboarding
      </Button>
      <Button
        tone="ghost"
        onPress={() => {
          resetPitch();
          router.replace("/onboarding/0");
        }}
      >
        Reset fictional pitch state
      </Button>
      {space(22)}
      <Button tone="pale" onPress={() => Linking.openURL("https://github.com/gengzihengce-max/UM-AI-Hackathon-26")}>
        Source code on GitHub · MIT
      </Button>
      {space(12)}
      <Txt size={12} color={C.muted}>
        Open-source mobile browser app · MIT license. Colors and
        workflow follow the teammate’s Iteration 2. Sign-in, research and
        invitations are explicitly simulated; no personal records or passwords
        are sent anywhere.
      </Txt>
    </Screen>
  );
}
