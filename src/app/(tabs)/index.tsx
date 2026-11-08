import React from "react";
import { View, Pressable } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Txt,
  Heading,
  Card,
  Row,
  Button,
  Kicker,
  Icon,
  space,
} from "../../components/ui";
import { Cloud } from "../../components/art";
import { WorkoutCards } from "../../components/workout-cards";
import { C, CATEGORY_GROUPS, GAME_INFO } from "../../lib/theme";
import { useApp, YEAR } from "../../lib/store";
export default function Home() {
  const { prefs, patch, plan, start, month, rounds } = useApp(),
    demo = prefs.demo,
    checkins = rounds.filter((r) => !r.practice && !r.paused).length,
    hour = new Date().getHours(),
    greeting =
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
    done = plan.done.length === plan.games.length && plan.games.length > 0,
    continuing = plan.started && !done;
  function begin() {
    start();
    router.push("/workout");
  }
  return (
    <Screen footer={<View />}>
      <Kicker>
        {demo
          ? `Pitch mode · fictional history · ${YEAR.months[month].label}`
          : new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
      </Kicker>
      {space(14)}
      <Txt size={25} weight="extra">
        {demo ? "Good morning" : greeting}
        {prefs.name ? `, ${prefs.name}` : ""}
      </Txt>
      {space(18)}
      {!demo ? (
        <Card color={C.pale}>
          <Row>
            <Icon name="leaf-outline" color={C.ink} />
            <Kicker>Your baseline</Kicker>
          </Row>
          <Txt size={24} weight="extra">
            {checkins === 0
              ? "Welcome to Memory Garden"
              : `${checkins} check-in${checkins === 1 ? "" : "s"} so far`}
          </Txt>
          <Txt>
            {checkins === 0
              ? "Your first sessions build your personal baseline. There’s nothing to compare yet."
              : "Keep a steady rhythm. A few short sessions a week is plenty."}
          </Txt>
          <Txt size={12}>This app is a check-in, not a diagnosis.</Txt>
        </Card>
      ) : (
      <Card color={C.greenBg}>
        <Row>
          <Icon name="checkmark-circle-outline" color={C.green} />
          <Kicker color={C.green}>Demo check-in</Kicker>
        </Row>
        <Txt size={24} weight="extra">
          {month >= 9 ? "Look at your recent pattern" : "You’re doing well"}
        </Txt>
        <Txt>
          {month >= 9
            ? "Some game results differ from your earlier pattern."
            : "Your recent results are steady."}
        </Txt>
        <Txt size={12}>This result is not a medical diagnosis.</Txt>
        <Txt size={10} color={C.muted}>
          Scripted presentation state · synthetic data only
        </Txt>
      </Card>
      )}
      {space(24)}
      <Kicker>Daily recommendations</Kicker>
      {space(10)}
      <Card color={C.blue} style={{ borderRadius: 36, padding: 22 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: 6 }}>
            <Txt size={27} weight="extra">
              {done ? "Congratulations!" : "Today’s workout"}
            </Txt>
            <Txt>
              {done
                ? "A little consistency goes a long way."
                : `${3 - plan.done.length} games left · about ${Math.max(1, (3 - plan.done.length) * 3)} minutes`}
            </Txt>
          </View>
          <Cloud size={82} thinking={!done} />
        </Row>
        <Txt>
          {done
            ? "You’ve finished your three-game session."
            : "All 3 games are mysteries. You find out one at a time."}
        </Txt>
        <Button
          tone="coral"
          icon={done ? "trophy-outline" : "play-outline"}
          onPress={() => (done ? router.push("/(tabs)/journey") : begin())}
        >
          {done
            ? "See my journey"
            : continuing
              ? "Continue workout"
              : "Start playing"}
        </Button>
      </Card>
      {space(14)}
      <WorkoutCards compact />
      {space(24)}
      <Txt size={21} weight="extra">
        Categories
      </Txt>
      {space(14)}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {CATEGORY_GROUPS.map((group) => (
          <Pressable
            key={group.title}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: "/library",
                params: { area: group.title },
              })
            }
            style={{
              width: "48%",
              minHeight: 160,
              borderRadius: 32,
              padding: 18,
              gap: 11,
              backgroundColor: group.color,
            }}
          >
            <Icon name={group.icon} size={29} />
            <Txt weight="extra" size={17}>
              {group.title}
            </Txt>
            <Txt size={12}>
              {group.ids.length} {group.ids.length === 1 ? "game" : "games"}
            </Txt>
          </Pressable>
        ))}
      </View>
      {space(24)}
      <Txt size={21} weight="extra">
        Daily picks
      </Txt>
      {space(14)}
      {(["trivia", "memory"] as const)
        .filter((id) => !prefs.hidden.includes(id))
        .map((id) => (
          <Pressable
            accessibilityRole="button"
            key={id}
            onPress={() =>
              router.push({ pathname: "/instructions", params: { game: id } })
            }
            style={{
              backgroundColor: GAME_INFO[id].color,
              borderRadius: 32,
              padding: 20,
              marginBottom: 12,
            }}
          >
            <Txt size={12}>
              {id === "trivia" ? "Learn + play" : "Game · Touch"} ·{" "}
              {GAME_INFO[id].duration}
            </Txt>
            <Txt size={20} weight="extra">
              {GAME_INFO[id].title}
            </Txt>
          </Pressable>
        ))}
      {space(12)}
      <Button
        tone="pale"
        icon="sparkles-outline"
        onPress={() => router.push("/year-demo")}
      >
        {demo ? "Present the synthetic year" : "See an example year (sample data)"}
      </Button>
      {demo && space(12)}
      {demo && (
        <Button tone="ghost" onPress={() => router.push("/pitch")}>
          Presenter controls
        </Button>
      )}
    </Screen>
  );
}
