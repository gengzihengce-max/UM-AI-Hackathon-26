import React from "react";
import { Screen, Heading, Txt, Toggle, Card, space } from "../components/ui";
import { useApp } from "../lib/store";
import { C } from "../lib/theme";
export default function Privacy() {
  const { prefs, patch } = useApp();
  return (
    <Screen back>
      <Heading>Your privacy, in plain words</Heading>
      <Card color={C.pale}>
        <Txt>
          Profile choices and interactive pitch rounds stay in local device
          storage. The year and report are fictional fixtures bundled with the
          app.
        </Txt>
        <Txt>
          No data is uploaded for research, provider contact or language-model
          training.
        </Txt>
      </Card>
      {space(20)}
      <Toggle
        label="Share anonymous results to help research"
        value={prefs.research}
        onChange={(research: boolean) => patch({ research })}
      />
      <Txt size={12}>
        This preference is simulated locally for the pitch. A future real study
        needs its own consent and data-governance workflow.
      </Txt>
      {space(20)}
      <Txt size={12}>
        If you use your phone keyboard’s dictation, that service follows your
        device’s speech-processing settings.
      </Txt>
    </Screen>
  );
}
