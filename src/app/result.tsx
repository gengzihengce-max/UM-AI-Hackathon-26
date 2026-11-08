import React, { useEffect } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import {
  Screen,
  Heading,
  Txt,
  Button,
  Card,
  Row,
  Chips,
  Kicker,
  space,
} from "../components/ui";
import { Ring, HistoryLine } from "../components/art";
import { GAME_INFO, GameId, C } from "../lib/theme";
import { useApp, YEAR, gameSeries, number } from "../lib/store";
export default function Result() {
  const { sample } = useLocalSearchParams<{ sample: GameId }>(),
    { result, prefs, patch, plan, setPractice, rounds } = useApp(),
    fixture =
      sample && GAME_INFO[sample]
        ? YEAR.sessions.filter((s) => s.game === sample && s.eligible).at(-1)
        : null;
  const r = fixture
    ? {
        game: sample,
        score: fixture.score,
        metrics: fixture.metrics,
        practice: false,
        paused: false,
        note: "Scripted synthetic pitch result. This is not a newly measured round.",
      }
    : result;
  if (!r)
    return (
      <Screen back>
        <Heading>Your result is ready after a game.</Heading>
        <Button onPress={() => router.replace("/workout")}>Open workout</Button>
      </Screen>
    );
  const g = GAME_INFO[r.game],
    demo = prefs.demo || !!fixture,
    earlier = rounds
      .filter(
        (x) =>
          x.game === r.game &&
          !x.practice &&
          !x.paused &&
          x.id !== (result && !fixture ? result.id : ""),
      )
      .slice(-5)
      .map((x) => x.score),
    series = demo
      ? gameSeries(r.game)
          .points.slice(-6)
          .map((p) => p.score || 0)
      : earlier,
    inPlan = plan.started && plan.done.includes(r.game),
    complete = plan.done.length === plan.games.length;
  function next() {
    if (r!.practice) {
      setPractice(false);
      router.replace({
        pathname: "/play",
        params: { game: r!.game, workout: plan.started ? "1" : "0" },
      });
    } else
      router.replace(
        inPlan ? (complete ? "/complete" : "/workout") : "/(tabs)",
      );
  }
  return (
    <Screen help={false}>
      <Kicker>
        {g.title}
        {fixture ? " · SYNTHETIC RESULT" : ""}
      </Kicker>
      {space(14)}
      <Heading>Game done!</Heading>
      {r.practice ? (
        <Card color={C.pale}>
          <Txt weight="extra" size={22}>
            Practice complete
          </Txt>
          <Txt>
            Thanks for trying it. Practice stays outside scored check-ins.
          </Txt>
        </Card>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Ring value={r.score} range={!!fixture} />
          <Row>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: C.blue,
              }}
            />
            <Txt size={12}>Today</Txt>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: C.amber,
              }}
            />
            <Txt size={12}>
              {demo ? "Illustrative history" : "Your earlier rounds"}
            </Txt>
          </Row>
        </View>
      )}
      {space(18)}
      {!r.practice && (
        <Card color={C.pale}>
          {demo || series.length ? (
            <HistoryLine values={[...series.slice(-5), r.score]} />
          ) : (
            <Txt weight="extra">
              Your first result for this game. It starts your baseline.
            </Txt>
          )}
          <Txt size={12} color={C.muted}>
            {demo
              ? "Synthetic history for the pitch. Interactive demo results are stored separately."
              : "Only your own rounds on this device are shown."}
          </Txt>
        </Card>
      )}
      {space(16)}
      {r.metrics.map((m) => (
        <Row
          key={m.label}
          style={{ justifyContent: "space-between", paddingVertical: 10 }}
        >
          <Txt style={{ flex: 1 }}>{m.label}</Txt>
          <Txt weight="extra">
            {number(m.value)} {m.unit}
          </Txt>
        </Row>
      ))}
      {r.paused && (
        <Card color={C.amberBg}>
          <Txt size={13}>
            This round included a pause or early finish. It stays outside
            comparable check-ins.
          </Txt>
        </Card>
      )}
      {space(10)}
      <Txt size={11} color={C.muted}>
        {r.note}
      </Txt>
      {space(24)}
      <Txt weight="extra" size={19}>
        How was this game?
      </Txt>
      {space(12)}
      <Row>
        <Button
          tone={prefs.ratings[r.game] === "liked" ? "blue" : "pale"}
          style={{ flex: 1 }}
          onPress={() =>
            patch({ ratings: { ...prefs.ratings, [r.game]: "liked" } })
          }
        >
          Liked it
        </Button>
        <Button
          tone={prefs.hidden.includes(r.game) ? "amber" : "pale"}
          style={{ flex: 1 }}
          onPress={() =>
            patch({
              hidden: [...new Set([...prefs.hidden, r.game])],
              ratings: { ...prefs.ratings, [r.game]: "hidden" },
            })
          }
        >
          Not for me
        </Button>
      </Row>
      {space(24)}
      <Button tone="coral" icon="arrow-forward" onPress={next}>
        {r.practice
          ? "Start check-in"
          : inPlan
            ? complete
              ? "Session complete"
              : "Next mystery game"
            : "Back to Home"}
      </Button>
      {space(12)}
      <Button tone="ghost" onPress={() => router.replace("/(tabs)")}>
        End session for now
      </Button>
      {space(14)}
      <Txt size={11} color={C.muted}>
        Temporary game-performance score. This result is not a medical
        diagnosis.
      </Txt>
    </Screen>
  );
}
