import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Row,
  Chips,
  Card,
  Button,
  Icon,
  Kicker,
  space,
} from "../../components/ui";
import { TrendChart } from "../../components/art";
import { C, CATEGORY_GROUPS } from "../../lib/theme";
import { useApp, YEAR, number, userTrend } from "../../lib/store";
import { exportReport } from "../../lib/exports";
export default function Stats() {
  const { month, prefs, rounds } = useApp(),
    demo = prefs.demo,
    [range, setRange] = useState("This month"),
    [table, setTable] = useState(false),
    review = demo && month >= 9;
  const now = new Date(),
    thisMonth = now.toISOString().slice(0, 7),
    mine = rounds.filter((r) => !r.practice && !r.paused),
    trend = userTrend(rounds);
  const counts = CATEGORY_GROUPS.map((g) => {
    const n = demo
      ? Math.min(
          ...g.ids.map(
            (id) => YEAR.series.find((s) => s.id === id)!.points[month].n,
          ),
        )
      : mine.filter((r) => g.ids.includes(r.game) && r.at.startsWith(thisMonth))
          .length;
    return { ...g, n, steps: Math.min(4, Math.floor(n / 2)) };
  });
  return (
    <Screen footer={<View />}>
      <Heading>Your Stats</Heading>
      <Chips
        options={["This month", "Over time"]}
        value={range}
        onSelect={setRange}
      />
      {space(18)}
      <Kicker>
        {demo
          ? `Synthetic record · ${YEAR.months[month].label}`
          : `Your record · ${now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
      </Kicker>
      {space(12)}
      {!demo ? (
        <Card color={C.pale}>
          <Txt size={24} weight="extra">
            {mine.length ? "Building your baseline" : "No results yet"}
          </Txt>
          <Txt>
            {mine.length
              ? `${mine.length} check-in${mine.length === 1 ? "" : "s"} recorded. Patterns become meaningful after a few weeks of regular play.`
              : "Play your first session. Your results will appear here."}
          </Txt>
          {!mine.length && (
            <Button
              tone="coral"
              icon="play-outline"
              onPress={() => router.push("/(tabs)")}
            >
              Start playing
            </Button>
          )}
        </Card>
      ) : (
      <Card color={review ? C.amberBg : C.greenBg}>
        <Txt size={24} weight="extra">
          {review ? "Talk to your doctor" : "You’re doing well"}
        </Txt>
        <Txt>
          {review
            ? "Share your results anytime."
            : "Your recent results are steady."}
        </Txt>
        <Txt size={11}>
          Scripted {review ? "review" : "steady"} state for the pitch. No
          clinical alert algorithm.
        </Txt>
        {review && (
          <Button
            tone="amber"
            icon="chatbubble-outline"
            onPress={() => router.push("/provider")}
          >
            Contact provider
          </Button>
        )}
        <Button
          tone={review ? "pale" : "coral"}
          icon="share-outline"
          onPress={exportReport}
        >
          Export summary
        </Button>
      </Card>
      )}
      {space(20)}
      {demo && (
        <Button
          tone="pale"
          icon="analytics-outline"
          onPress={() => router.push("/year-demo")}
        >
          Full analysis
        </Button>
      )}
      {demo && space(12)}
      <Card color={C.soft}>
        <Txt weight="extra">Full report</Txt>
        <Txt size={13}>
          {demo
            ? "Available after 6 months. The fictional year includes a complete report."
            : "Available after 6 months of regular check-ins."}
        </Txt>
        <Button
          tone="ghost"
          small
          onPress={() => router.push(demo ? "/report" : "/year-demo")}
        >
          {demo ? "Read the AI-authored report →" : "See an example year (sample data) →"}
        </Button>
      </Card>
      {space(24)}
      <Heading
        sub={`Have I tested enough? ${counts.filter((c) => c.steps === 4).length} of 4 areas meet this illustrative collection goal.`}
      >
        What you’ve measured this month
      </Heading>
      <Txt size={12} color={C.muted}>
        Four segments represent a goal of 8 eligible check-ins per activity.
        This is collection, not clinical biomarker validation.
      </Txt>
      {space(18)}
      {counts.map((g) => (
        <Card
          key={g.title}
          color={C.white}
          style={{ paddingHorizontal: 0, marginBottom: 12 }}
        >
          <Row>
            <Icon name={g.icon} />
            <Txt weight="extra" style={{ flex: 1 }}>
              {g.title}
            </Txt>
          </Row>
          <Row style={{ gap: 6 }}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  height: 16,
                  borderRadius: 8,
                  flex: 1,
                  backgroundColor: i < g.steps ? g.color : C.soft,
                  borderColor: C.line,
                  borderWidth: i < g.steps ? 0 : 1,
                }}
              />
            ))}
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Txt size={12}>
              {g.steps === 4
                ? "✓ Enough for this month"
                : g.n
                  ? `${Math.max(0, 8 - g.n)} more games to go`
                  : "○ Not played yet"}
            </Txt>
            {g.steps < 4 && (
              <Button
                small
                tone="pale"
                onPress={() =>
                  router.push({
                    pathname: "/library",
                    params: { area: g.title },
                  })
                }
              >
                Play
              </Button>
            )}
          </Row>
        </Card>
      ))}
      {space(12)}
      <Txt size={22} weight="extra">
        Time trends
      </Txt>
      {space(14)}
      <Card color={C.pale}>
        {!demo ? (
          table ? (
            trend.months.length ? (
              trend.months.map((m, i) => (
                <Row key={m.key} style={{ justifyContent: "space-between" }}>
                  <Txt size={12}>{m.label}</Txt>
                  <Txt size={12}>
                    {trend.series
                      .filter((s) => s.points[i])
                      .map((s) => number(s.points[i]!.score, 0))
                      .join(" · ")}
                  </Txt>
                </Row>
              ))
            ) : (
              <Txt size={12}>No check-ins yet.</Txt>
            )
          ) : (
            <TrendChart data={trend} month={trend.months.length - 1} />
          )
        ) : table ? (
          YEAR.months.slice(0, month + 1).map((m, i) => (
            <Row key={m.key} style={{ justifyContent: "space-between" }}>
              <Txt size={12}>{m.label}</Txt>
              <Txt size={12}>
                {YEAR.series
                  .map((s) => number(s.points[i].score, 0))
                  .join(" · ")}
              </Txt>
            </Row>
          ))
        ) : (
          <TrendChart month={month} />
        )}
        <Txt size={12}>
          {demo
            ? "Synthetic monthly means. Demo points are not clinical scores."
            : "Your daily averages. Game points are not clinical scores."}
        </Txt>
        <Button tone="ghost" small onPress={() => setTable(!table)}>
          {table ? "View as chart" : "View as table"}
        </Button>
      </Card>
      {space(16)}
      <Txt size={12} color={C.muted}>
        This app is a check-in, not a diagnosis.
      </Txt>
    </Screen>
  );
}
