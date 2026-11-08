import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Button,
  Row,
  Icon,
  Card,
  CircleButton,
  space,
} from "../../components/ui";
import { Forest } from "../../components/art";
import { useApp, YEAR } from "../../lib/store";
import { C } from "../../lib/theme";
export default function Journey() {
  const { month, prefs } = useApp(),
    [selected, setSelected] = useState(month),
    [table, setTable] = useState(false),
    scroll = useRef<ScrollView>(null),
    width = Math.min(useWindowDimensions().width - 40, 440);
  useEffect(() => {
    scroll.current?.scrollTo({ x: month * (width + 12), animated: false });
  }, [month, width]);
  const { rounds } = useApp(),
    mine = rounds.filter((r) => !r.practice && !r.paused),
    played = new Set(mine.map((r) => r.game));
  if (!prefs.demo)
    return (
      <Screen footer={<View />}>
        <Heading sub="Track your progress, one session at a time.">
          Your Journey
        </Heading>
        {space(12)}
        <Txt weight="extra">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Txt>
        <Txt size={13} color={C.muted}>
          You are here · Month 1
        </Txt>
        {space(18)}
        <Forest
          month={0}
          width={width}
          label={new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        />
        {space(14)}
        <Txt size={13}>
          {mine.length
            ? `${mine.length} check-in${mine.length === 1 ? "" : "s"} so far. Each session grows your forest.`
            : "Your journey starts with your first session."}
        </Txt>
        {space(24)}
        <Txt size={22} weight="extra">
          Achievements
        </Txt>
        {space(14)}
        {[
          ["First session", mine.length > 0 ? "Earned" : "Play one game"],
          [
            "A regular rhythm",
            `${new Set(mine.map((r) => r.at.slice(0, 10))).size} of 12 days played`,
          ],
          ["All five games", `${played.size} of 5 explored`],
        ].map(([title, sub]) => (
          <Card key={title} color={C.pale} style={{ marginBottom: 12 }}>
            <Row>
              <Icon name="trophy-outline" size={30} />
              <View style={{ flex: 1 }}>
                <Txt weight="extra">{title}</Txt>
                <Txt size={12}>{sub}</Txt>
              </View>
            </Row>
          </Card>
        ))}
      </Screen>
    );
  function move(n: number) {
    const i = Math.max(0, Math.min(11, n));
    setSelected(i);
    scroll.current?.scrollTo({
      x: i * (width + 12),
      animated: !prefs.reducedMotion,
    });
  }
  return (
    <Screen footer={<View />}>
      <Heading sub="Track your progress, one session at a time.">
        Your Journey
      </Heading>
      {space(12)}
      <Txt weight="extra">{YEAR.months[selected].label}</Txt>
      <Txt size={13} color={C.muted}>
        {selected === month ? "You are here" : "Earlier in your fictional year"}{" "}
        · Month {selected + 1}
      </Txt>
      {space(18)}
      {table ? (
        <View style={{ gap: 12 }}>
          {YEAR.months.map((m, i) => (
            <Card key={m.key} color={i === selected ? C.pale : C.soft}>
              <Row>
                <Txt weight="bold" style={{ flex: 1 }}>
                  {m.label}
                </Txt>
                <Txt>
                  {i === month
                    ? "You are here"
                    : i < month
                      ? "Recorded"
                      : "Demo ahead"}
                </Txt>
              </Row>
            </Card>
          ))}
        </View>
      ) : (
        <ScrollView
          ref={scroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width + 12}
          decelerationRate="fast"
          contentContainerStyle={{ gap: 12 }}
          onMomentumScrollEnd={(e) =>
            setSelected(
              Math.max(
                0,
                Math.min(
                  11,
                  Math.round(e.nativeEvent.contentOffset.x / (width + 12)),
                ),
              ),
            )
          }
        >
          {YEAR.months.map((m, i) => (
            <Forest key={m.key} month={i} width={width} />
          ))}
        </ScrollView>
      )}
      {space(14)}
      <Row style={{ justifyContent: "space-between" }}>
        <CircleButton
          name="arrow-back"
          label="Previous month"
          onPress={() => move(selected - 1)}
        />
        <Txt size={12}>Lighter stretch Fuller stretch</Txt>
        <CircleButton
          name="arrow-forward"
          label="Next month"
          onPress={() => move(selected + 1)}
        />
      </Row>
      {space(20)}
      <Button
        tone="coral"
        onPress={() =>
          router.push({
            pathname: "/whole-journey",
            params: { month: String(selected) },
          })
        }
      >
        Whole Journey
      </Button>
      {space(10)}
      <Button tone="ghost" onPress={() => setTable(!table)}>
        {table ? "Back to forest view" : "View as table"}
      </Button>
      <Txt size={11} color={C.muted}>
        Foliage illustrates scripted game variation, not brain health. You
        always move forward.
      </Txt>
      {space(24)}
      <Txt size={22} weight="extra">
        Achievements
      </Txt>
      {space(14)}
      {[
        ["First session", "Earned"],
        ["A regular rhythm", "50 weeks of fictional visits"],
        ["All four areas", "Five game categories explored"],
      ].map(([title, sub]) => (
        <Card key={title} color={C.pale} style={{ marginBottom: 12 }}>
          <Row>
            <Icon name="trophy-outline" size={30} />
            <View style={{ flex: 1 }}>
              <Txt weight="extra">{title}</Txt>
              <Txt size={12}>{sub}</Txt>
            </View>
          </Row>
        </Card>
      ))}
    </Screen>
  );
}
