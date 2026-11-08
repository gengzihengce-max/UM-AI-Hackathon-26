import React from "react";
import { Screen, Heading, Txt, Card, Button, space } from "../components/ui";
import { exportReport } from "../lib/exports";
import { C } from "../lib/theme";
export default function Provider() {
  return (
    <Screen back>
      <Heading sub="A conversation starts with a clear record.">
        Contact provider
      </Heading>
      {space(18)}
      <Card color={C.amberBg}>
        <Txt>
          Share a factual summary with a provider you choose. The app cannot
          determine whether you need medical care.
        </Txt>
      </Card>
      {space(20)}
      <Txt>
        The report in this pitch uses a fictional person and synthetic
        measurements. The button below opens your phone’s share sheet; nothing
        is sent automatically.
      </Txt>
      {space(24)}
      <Button tone="coral" icon="share-outline" onPress={exportReport}>
        Choose how to share report
      </Button>
    </Screen>
  );
}
