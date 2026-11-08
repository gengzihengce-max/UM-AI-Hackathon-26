import React, { useState } from "react";
import { router } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Card,
  Button,
  Field,
  space,
} from "../components/ui";
import { Cloud } from "../components/art";
import { C } from "../lib/theme";
export default function Help() {
  const [q, setQ] = useState(""),
    [answer, setAnswer] = useState("");
  function ask(text: string) {
    setQ(text);
    const s = text.toLowerCase();
    setAnswer(
      /diagnos|alzheimer|doctor|risk/.test(s)
        ? "This is a check-in, not a diagnosis. The fictional report illustrates patterns; it cannot establish a disease, risk level or need for care."
        : /data|privacy|save|ai/.test(s)
          ? "The year is generated and the AI-authored report is bundled offline. Interactive pitch rounds stay on this device. No live LLM API or trained small model is used."
          : /practice|pause/.test(s)
            ? "Practice is never scored. Pause every game with the labeled button. You can end a session and continue its completed-game progress from Home."
            : "Start playing on Home opens Today’s workout. Tap the first revealed game to go straight to instructions. Your next mystery appears after you finish.",
    );
  }
  return (
    <Screen back>
      <Cloud size={100} />
      <Heading>Need a hand?</Heading>
      <Txt>A built-in guide to the prototype.</Txt>
      {space(18)}
      {[
        "How does my workout work?",
        "Is practice scored?",
        "Where does the AI report come from?",
        "Does this diagnose Alzheimer’s?",
      ].map((s) => (
        <Button
          key={s}
          tone="pale"
          small
          style={{ marginBottom: 10 }}
          onPress={() => ask(s)}
        >
          {s}
        </Button>
      ))}
      <Field label="Your question" value={q} onChangeText={setQ} />
      {space(10)}
      <Button tone="coral" onPress={() => ask(q)}>
        Ask
      </Button>
      {space(18)}
      {answer && (
        <Card color={C.pale}>
          <Txt>{answer}</Txt>
          <Txt size={11}>Built-in explanation, not a live LLM response.</Txt>
        </Card>
      )}
      {space(18)}
      <Button tone="ghost" onPress={() => router.push("/pitch")}>
        Presenter controls
      </Button>
    </Screen>
  );
}
