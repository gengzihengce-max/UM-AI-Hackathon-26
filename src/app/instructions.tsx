import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import {
  Screen,
  Txt,
  Heading,
  Card,
  Button,
  Toggle,
  Row,
  Kicker,
  space,
} from "../components/ui";
import { GamePicture } from "../components/art";
import { C, GAME_INFO, GameId } from "../lib/theme";
import { useApp } from "../lib/store";
export default function Instructions() {
  const { game: raw, workout } = useLocalSearchParams<{
      game: GameId;
      workout: string;
    }>(),
    game = raw && GAME_INFO[raw] ? raw : "memory",
    g = GAME_INFO[game],
    { prefs, patch, setPractice } = useApp(),
    [demoPaused, setDemoPaused] = useState(false);
  const read = () => {
    Speech.stop();
    Speech.speak(g.instructions.join(" "), { rate: 0.85, language: "en-US" });
  };
  useEffect(() => {
    if (prefs.readAloud) read();
    return () => {
      Speech.stop();
    };
  }, [game, prefs.readAloud]);
  function play(practice: boolean) {
    setPractice(practice);
    router.push({
      pathname: "/play",
      params: { game, workout: workout || "0" },
    });
  }
  return (
    <Screen back>
      <Heading>{g.title}</Heading>
      {space(15)}
      <View style={{ opacity: demoPaused ? 0.65 : 1 }}>
        <GamePicture game={game} height={170} />
      </View>
      {space(8)}
      <Button
        tone="ghost"
        small
        icon={demoPaused ? "play-outline" : "pause-outline"}
        onPress={() => setDemoPaused(!demoPaused)}
      >
        {demoPaused ? "Play example" : "Pause example"}
      </Button>
      <Txt size={11} color={C.muted} style={{ textAlign: "center" }}>
        ILLUSTRATED EXAMPLE · NOT A MEASURED ROUND
      </Txt>
      {space(20)}
      {g.instructions.map((step, i) => (
        <Row key={step} style={{ alignItems: "flex-start", marginBottom: 16 }}>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: [C.blue, C.coral, C.amber][i],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Txt weight="extra">{i + 1}</Txt>
          </View>
          <Txt style={{ flex: 1 }}>{step}</Txt>
        </Row>
      ))}
      {space(10)}
      <Card color={C.pale}>
        <Button tone="blue" icon="volume-high-outline" onPress={read}>
          Hear the instructions
        </Button>
        <Toggle
          label="Always read instructions aloud"
          value={prefs.readAloud}
          onChange={(readAloud: boolean) => patch({ readAloud })}
        />
        <Button small tone="ghost" onPress={() => Speech.stop()}>
          Stop audio
        </Button>
      </Card>
      {space(24)}
      <Button tone="coral" onPress={() => play(true)}>
        Try a practice round
      </Button>
      {space(12)}
      <Button tone="pale" onPress={() => play(false)}>
        Skip practice
      </Button>
      {space(14)}
      <Txt size={12} color={C.muted}>
        Practice is never scored. Pause is available in every game.
      </Txt>
    </Screen>
  );
}
