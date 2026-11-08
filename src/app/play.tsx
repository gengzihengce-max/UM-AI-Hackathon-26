import React, { useRef, useState } from "react";
import { View, Pressable, ScrollView, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import { Txt, Row, Button, Sheet, space } from "../components/ui";
import {
  Mahjong,
  Animals,
  Voyage,
  Trivia,
  Bonus,
  Payload,
} from "../components/games";
import { GAME_INFO, C, GameId } from "../lib/theme";
import { useApp } from "../lib/store";
export default function Play() {
  const { game: raw, workout } = useLocalSearchParams<{
      game: GameId;
      workout: string;
    }>(),
    game = raw && GAME_INFO[raw] ? raw : "memory",
    { prefs, plan, practice, finish } = useApp(),
    [paused, setPaused] = useState(false),
    [seed] = useState(() => Math.floor(Math.random() * 100000)),
    wasPaused = useRef(false),
    saved = useRef(false),
    g = GAME_INFO[game];
  const Engine = {
    memory: Mahjong,
    words: Animals,
    voyage: Voyage,
    trivia: Trivia,
    switch: Bonus,
  }[game];
  function complete(p: Payload) {
    if (saved.current) return;
    saved.current = true;
    finish(
      {
        game,
        score: p.score,
        metrics: p.metrics,
        trials: p.trials,
        note: p.note,
        practice,
        paused: wasPaused.current || !!p.early,
      },
      workout === "1",
    );
    router.replace("/result");
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.white }}>
      <Row
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          justifyContent: "space-between",
        }}
      >
        <Button
          tone="pale"
          small
          icon="pause-outline"
          onPress={() => {
            wasPaused.current = true;
            setPaused(true);
          }}
        >
          Pause
        </Button>
        <Txt size={12} weight="bold">
          {practice
            ? "Practice · unscored"
            : workout === "1"
              ? `Game ${Math.min(3, plan.done.length + 1)} of 3`
              : "Check-in"}
        </Txt>
      </Row>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
      >
        <Txt size={12} weight="bold" color={C.muted}>
          {g.title}
        </Txt>
        {space(12)}
        <Engine key={game} paused={paused} seed={seed} onFinish={complete} />
      </ScrollView>
      <Sheet
        visible={paused}
        onClose={() => setPaused(false)}
        title="Take your time"
      >
        <Txt>Your progress stays here while you take a break.</Txt>
        <Button
          tone="coral"
          icon="play-outline"
          onPress={() => setPaused(false)}
        >
          Resume
        </Button>
        <Button
          tone="pale"
          icon="volume-high-outline"
          onPress={() => Speech.speak(g.instructions.join(" "), { rate: 0.85 })}
        >
          Hear instructions again
        </Button>
        <Button
          tone="ghost"
          onPress={() => {
            Speech.stop();
            router.replace("/(tabs)");
          }}
        >
          End game for now
        </Button>
        <Txt size={11} color={C.muted}>
          Paused rounds are saved separately from comparable check-ins.
        </Txt>
      </Sheet>
    </SafeAreaView>
  );
}
