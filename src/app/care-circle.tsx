import React from "react";
import { Screen, Heading, Txt, Card, Button, space } from "../components/ui";
import { exportReport } from "../lib/exports";
import { C } from "../lib/theme";
export default function Care() {
  return (
    <Screen back>
      <Heading>Family and care circle</Heading>
      <Card color={C.pale}>
        <Txt weight="extra">You choose who sees your record.</Txt>
        <Txt>
          Invite and permission controls are represented in the workflow. This
          pitch build has no cloud accounts or invitation delivery.
        </Txt>
      </Card>
      {space(20)}
      <Button tone="coral" onPress={exportReport}>
        Share the fictional demo report
      </Button>
    </Screen>
  );
}
