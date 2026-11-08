import React from "react";
import { View } from "react-native";
import {
  Screen,
  Heading,
  Txt,
  Card,
  Button,
  Kicker,
  Row,
  Icon,
  space,
} from "../components/ui";
import { TrendChart } from "../components/art";
import { C, GAME_INFO, GameId } from "../lib/theme";
import { YEAR, number } from "../lib/store";
import { REPORT } from "../lib/report";
import { exportReport } from "../lib/exports";
export default function Report() {
  return (
    <Screen back>
      <Kicker>AI-authored · cached pitch report</Kicker>
      {space(12)}
      <Heading sub="Evelyn Brooks · fictional · Nov 2025–Oct 2026">
        One year. Different patterns.
      </Heading>
      {space(14)}
      <Card color={C.amberBg}>
        <Txt weight="extra">Every record is synthetic.</Txt>
        <Txt size={13}>
          This interpretation describes a scripted demonstration. It does not
          identify a medical condition.
        </Txt>
      </Card>
      {space(20)}
      <TrendChart />
      {space(18)}
      <Card color={C.blue}>
        <Txt weight="extra" size={21}>
          What the pattern shows
        </Txt>
        <Txt>{REPORT.summary}</Txt>
      </Card>
      {space(20)}
      {REPORT.observations.map((o) => {
        const f = YEAR.facts.find((x) => x.id === o.id)!;
        return (
          <View key={o.id} style={{ marginBottom: 26, gap: 12 }}>
            <Kicker>{GAME_INFO[o.id as GameId].title}</Kicker>
            <Txt weight="extra" size={21}>
              {o.heading}
            </Txt>
            <Txt color={C.muted}>{o.text}</Txt>
            <Card color={C.soft}>
              <Row style={{ justifyContent: "space-between" }}>
                <View>
                  <Txt size={11}>First 3 months</Txt>
                  <Txt size={25} weight="extra">
                    {number(f.baseline.raw)}
                  </Txt>
                  <Txt size={11}>n = {f.baseline.n}</Txt>
                </View>
                <Icon name="arrow-forward" />
                <View>
                  <Txt size={11}>October</Txt>
                  <Txt size={25} weight="extra">
                    {number(f.latest.raw)}
                  </Txt>
                  <Txt size={11}>n = {f.latest.n}</Txt>
                </View>
              </Row>
              <Txt size={11}>
                {f.rawLabel} · {f.rawUnit}
              </Txt>
            </Card>
          </View>
        );
      })}
      <Txt size={22} weight="extra">
        Limits of this demonstration
      </Txt>
      {space(14)}
      {REPORT.limits.map((l) => (
        <Row key={l} style={{ alignItems: "flex-start", marginBottom: 14 }}>
          <Txt>•</Txt>
          <Txt size={14} style={{ flex: 1 }}>
            {l}
          </Txt>
        </Row>
      ))}
      {space(14)}
      <Card color={C.pale}>
        <Txt weight="extra">Where this report came from</Txt>
        <Txt size={12}>{REPORT.provenance}</Txt>
        <Txt size={11}>Scenario evelyn-year-v2 · seed 671104 · demo-v2</Txt>
      </Card>
      {space(24)}
      <Button tone="coral" icon="share-outline" onPress={exportReport}>
        Export PDF report
      </Button>
    </Screen>
  );
}
