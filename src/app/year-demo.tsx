import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Button,
  Row,
  Card,
  Kicker,
  Chips,
  Icon,
  space,
} from "../components/ui";
import { TrendChart, SERIES_COLORS, Cloud } from "../components/art";
import { C, GAME_INFO, GAME_IDS, GameId } from "../lib/theme";
import { YEAR, number } from "../lib/store";
export default function YearDemo() {
  const [month, setMonth] = useState(11),
    [playing, setPlaying] = useState(false),
    [game, setGame] = useState<GameId | null>(null),
    [raw, setRaw] = useState(false),
    [table, setTable] = useState(false),
    scroll = useRef<ScrollView>(null);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () =>
        setMonth((m) => {
          if (m >= 11) {
            setPlaying(false);
            return 11;
          }
          return m + 1;
        }),
      1600,
    );
    return () => clearInterval(t);
  }, [playing]);
  const through = YEAR.sessions.filter(
      (s) => s.at.slice(0, 7) <= YEAR.months[month].key,
    ),
    eligible = through.filter((s) => s.eligible),
    chap =
      month < 4
        ? {
            title: "Getting familiar",
            body: "Early gains reflect scripted task learning.",
          }
        : month < 7
          ? {
              title: "A dip, then recovery",
              body: "March’s temporary change appears across activities.",
            }
          : month < 10
            ? {
                title: "The curves separate",
                body: "Different game patterns become easier to see over repeated visits.",
              }
            : {
                title: "Look beyond one score",
                body: "Matching, navigation and delayed recognition diverge from the guided trail.",
              };
  function select(m: number) {
    setPlaying(false);
    setMonth(m);
    scroll.current?.scrollTo({ x: Math.max(0, m * 66 - 130), animated: true });
  }
  return (
    <Screen back>
      <Kicker>One person · one fictional year</Kicker>
      {space(10)}
      <Heading sub="November 2025–October 2026">
        A year tells a different story.
      </Heading>
      {space(18)}
      <Card color={C.blue}>
        <Row>
          <View style={{ flex: 1, gap: 7 }}>
            <Txt size={25} weight="extra">
              Evelyn Brooks
            </Txt>
            <Txt>67 years old · entirely fictional</Txt>
            <Txt size={12}>Same activities. Same synthetic device.</Txt>
          </View>
          <Cloud size={76} />
        </Row>
      </Card>
      {space(15)}
      <Card color={C.amberBg}>
        <Row>
          <Icon name="flask-outline" />
          <Txt weight="extra">SYNTHETIC DEMO</Txt>
        </Row>
        <Txt size={13}>
          Every response is generated. The patterns are scripted; scores use
          temporary equations.
        </Txt>
      </Card>
      {space(22)}
      <Row style={{ justifyContent: "space-between" }}>
        <View>
          <Kicker>Through</Kicker>
          <Txt size={23} weight="extra">
            {YEAR.months[month].label}
          </Txt>
        </View>
        <Button
          small
          tone="coral"
          icon={playing ? "pause-outline" : "play-outline"}
          onPress={() => {
            if (month === 11) setMonth(0);
            setPlaying(!playing);
          }}
        >
          {playing ? "Pause" : "Play year"}
        </Button>
      </Row>
      {space(16)}
      <ScrollView
        ref={scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {YEAR.months.map((m, i) => (
          <Pressable
            key={m.key}
            accessibilityRole="button"
            accessibilityLabel={"Show through " + m.label}
            onPress={() => select(i)}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 13,
              minWidth: 58,
              borderRadius: 25,
              backgroundColor: month === i ? C.blue : C.soft,
            }}
          >
            <Txt size={13} weight={month === i ? "extra" : "medium"}>
              {m.short}
            </Txt>
          </Pressable>
        ))}
      </ScrollView>
      {space(18)}
      <Card color={C.pale}>
        <Txt size={21} weight="extra">
          {chap.title}
        </Txt>
        <Txt size={14}>{chap.body}</Txt>
      </Card>
      {space(18)}
      <Row>
        <Card color={C.soft} style={{ flex: 1 }}>
          <Txt size={30} weight="extra">
            {eligible.length}
          </Txt>
          <Txt size={12}>eligible check-ins</Txt>
        </Card>
        <Card color={C.soft} style={{ flex: 1 }}>
          <Txt size={30} weight="extra">
            {through.length - eligible.length}
          </Txt>
          <Txt size={12}>kept outside curves</Txt>
        </Card>
      </Row>
      {space(24)}
      <Txt size={23} weight="extra">
        Five activities. Five curves.
      </Txt>
      <Txt size={12} color={C.muted}>
        Monthly means · arbitrary demo points / 100
      </Txt>
      {space(12)}
      <Card color={C.white} style={{ padding: 0 }}>
        <TrendChart month={month} />
      </Card>
      {space(18)}
      <Button tone="ghost" small onPress={() => setTable(!table)}>
        {table ? "Hide monthly table" : "View monthly table"}
      </Button>
      {table &&
        YEAR.months.slice(0, month + 1).map((m, i) => (
          <Card key={m.key} color={C.soft} style={{ marginBottom: 10 }}>
            <Txt weight="extra">{m.label}</Txt>
            {YEAR.series.map((s) => (
              <Row key={s.id} style={{ justifyContent: "space-between" }}>
                <Txt size={12}>{GAME_INFO[s.id as GameId].short}</Txt>
                <Txt size={12}>
                  {number(s.points[i].score)} · n={s.points[i].n}
                </Txt>
              </Row>
            ))}
          </Card>
        ))}
      {space(12)}
      <View style={{ gap: 12 }}>
        {GAME_IDS.map((id) => {
          const series = YEAR.series.find((s) => s.id === id)!,
            p = series.points[month];
          return (
            <Pressable
              key={id}
              accessibilityRole="button"
              onPress={() => {
                setGame(id);
                setRaw(false);
              }}
              style={{
                padding: 17,
                borderRadius: 25,
                backgroundColor: game === id ? C.pale : C.soft,
              }}
            >
              <Row>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: SERIES_COLORS[id],
                  }}
                />
                <Txt weight="bold" style={{ flex: 1 }}>
                  {GAME_INFO[id].title}
                </Txt>
                <Txt size={21} weight="extra">
                  {number(p.score)}
                </Txt>
              </Row>
              <Txt size={11}>Eligible sessions this month: {p.n}</Txt>
            </Pressable>
          );
        })}
      </View>
      {game && (
        <View style={{ gap: 15, marginTop: 26 }}>
          <Txt size={22} weight="extra">
            {GAME_INFO[game].title}
          </Txt>
          <Chips
            options={["Demo score", "Raw measure"]}
            value={raw ? "Raw measure" : "Demo score"}
            onSelect={(v: string) => setRaw(v === "Raw measure")}
          />
          <TrendChart month={month} game={game} raw={raw} />
          <Txt size={12}>
            {raw
              ? `${YEAR.facts.find((f) => f.id === game)!.rawLabel} (${YEAR.facts.find((f) => f.id === game)!.rawUnit})`
              : "Monthly mean placeholder score"}
            . No smoothing or clinical threshold.
          </Txt>
        </View>
      )}
      {space(24)}
      <Card color={C.ink}>
        <Kicker color={C.blue}>From pattern to explanation</Kicker>
        <Txt size={24} weight="extra" color={C.white}>
          Make the year understandable.
        </Txt>
        <Txt color={C.white}>
          A concise AI-authored report links each observation to the
          measurements and their limits.
        </Txt>
        <Button
          tone="coral"
          icon="sparkles-outline"
          onPress={() => router.push("/report")}
        >
          Read the year report
        </Button>
        <Txt size={10} color={C.white}>
          Prepared from this synthetic fixture · available offline
        </Txt>
      </Card>
      {space(18)}
      <Txt size={11} color={C.muted}>
        495 activities · 471 eligible check-ins · 5,072 trials. The fictional
        story is not Alzheimer’s disease progression.
      </Txt>
    </Screen>
  );
}
