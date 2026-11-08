import React from "react";
import { View } from "react-native";
import { C } from "../lib/theme";
import { useApp } from "../lib/store";
import { Txt, Chips, Toggle, Card, Button, Row } from "./ui";
export function Accessibility() {
  const { prefs, patch } = useApp();
  return (
    <View style={{ gap: 18 }}>
      <Card color={C.pale}>
        <Txt weight="bold">This is how text will look.</Txt>
      </Card>
      <Txt weight="extra">Text size</Txt>
      <Chips
        options={["Default", "Large", "Larger", "Largest"]}
        value={
          ["Default", "Large", "Larger", "Largest"][
            [1, 1.2, 1.5, 2].indexOf(prefs.textSize)
          ] || "Default"
        }
        onSelect={(v: string) =>
          patch({
            textSize: [1, 1.2, 1.5, 2][
              ["Default", "Large", "Larger", "Largest"].indexOf(v)
            ],
          })
        }
      />
      <Txt weight="extra">Color vision</Txt>
      <Chips
        options={[
          "Standard",
          "Red-green friendly",
          "Blue-yellow friendly",
          "Grayscale",
        ]}
        value={prefs.vision}
        onSelect={(vision: string) => patch({ vision })}
      />
      <Toggle
        label="High contrast"
        value={prefs.contrast}
        onChange={(contrast: boolean) => patch({ contrast })}
      />
      <Toggle
        label="Read screens aloud"
        description="Instructions and results are spoken"
        value={prefs.readAloud}
        onChange={(readAloud: boolean) => patch({ readAloud })}
      />
      <Toggle
        label="Reduce motion"
        description="Calmer games. Compare matching settings."
        value={prefs.reducedMotion}
        onChange={(reducedMotion: boolean) => patch({ reducedMotion })}
      />
      <Txt weight="extra">Hand for touch games</Txt>
      <Chips
        options={["Right", "Left"]}
        value={prefs.hand}
        onSelect={(hand: string) => patch({ hand })}
      />
    </View>
  );
}
export function Reminders() {
  const { prefs, patch } = useApp();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <View style={{ gap: 16 }}>
      <Toggle
        label="Gentle reminders"
        value={prefs.reminders}
        onChange={(reminders: boolean) => patch({ reminders })}
      />
      <Txt color={C.muted}>
        Days:{" "}
        {prefs.days.length
          ? prefs.days.map((i) => days[i]).join(", ")
          : "Choose the days that suit you"}
      </Txt>
      <Chips
        options={days}
        multiple
        value={prefs.days.map((i) => days[i])}
        onSelect={(v: string) => {
          const i = days.indexOf(v);
          patch({
            days: prefs.days.includes(i)
              ? prefs.days.filter((x) => x !== i)
              : [...prefs.days, i].sort(),
          });
        }}
      />
      <Txt weight="bold">Time</Txt>
      <Chips
        options={["9:00 AM", "10:00 AM", "6:00 PM"]}
        value={prefs.time}
        onSelect={(time: string) => patch({ time })}
      />
      <Txt size={12} color={C.muted}>
        Reminder preferences are demonstrated locally in this pitch build. No
        notifications are sent.
      </Txt>
    </View>
  );
}
