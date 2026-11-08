import React, { useState } from "react";
import { View, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Row,
  Icon,
  Card,
  Button,
  Field,
  Chips,
  space,
} from "../../components/ui";
import { Accessibility, Reminders } from "../../components/settings";
import { C, GAME_INFO, GAME_IDS } from "../../lib/theme";
import { useApp } from "../../lib/store";
import { exportData, exportReport } from "../../lib/exports";
export default function Account() {
  const { prefs, patch } = useApp(),
    [section, setSection] = useState("Accessibility"),
    [edit, setEdit] = useState(false);
  return (
    <Screen footer={<View />}>
      <Heading>Account</Heading>
      <Row style={{ marginVertical: 18 }}>
        <View
          style={{
            width: 66,
            height: 66,
            borderRadius: 33,
            backgroundColor: C.blue,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Txt size={25} weight="extra">
            {prefs.demo
              ? "EB"
              : (prefs.name || "You").slice(0, 2).toUpperCase()}
          </Txt>
        </View>
        <View style={{ flex: 1 }}>
          <Txt weight="extra" size={22}>
            {prefs.name || (prefs.demo ? "Evelyn" : "Your profile")}
          </Txt>
          <Txt size={13}>{prefs.email}</Txt>
          <Txt size={10} color={C.muted}>
            {prefs.demo
              ? "Fictional pitch profile · local device"
              : "Saved on this device"}
          </Txt>
        </View>
      </Row>
      <Button small tone="pale" onPress={() => setEdit(!edit)}>
        Edit profile
      </Button>
      {edit && (
        <View style={{ gap: 15, marginTop: 20 }}>
          <Field
            label="Name"
            value={prefs.name}
            onChangeText={(name: string) => patch({ name })}
          />
          <Field
            label="Email"
            value={prefs.email}
            onChangeText={(email: string) => patch({ email })}
          />
          <Chips
            options={["English", "Español"]}
            value={prefs.language}
            onSelect={(language: string) => patch({ language })}
          />
          <Txt size={12}>
            Game protocols and this pitch’s report are in English.
          </Txt>
        </View>
      )}
      {space(26)}
      {[
        "Accessibility",
        "Reminders",
        "Your games",
        "Family and care circle",
        "Your data",
        "Help",
      ].map((s) => (
        <View
          key={s}
          style={{
            borderTopWidth: 1,
            borderColor: "#DCE7ED",
            paddingVertical: 18,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: section === s }}
            onPress={() => setSection(section === s ? "" : s)}
            style={{
              minHeight: 48,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Txt weight="extra" size={21}>
              {s}
            </Txt>
            <Icon name={section === s ? "chevron-up" : "chevron-down"} />
          </Pressable>
          {section === s && (
            <View style={{ paddingTop: 18, gap: 14 }}>
              {s === "Accessibility" && <Accessibility />}
              {s === "Reminders" && <Reminders />}
              {s === "Your games" && (
                <>
                  <Txt weight="extra">Liked games</Txt>
                  {GAME_IDS.filter((id) => prefs.ratings[id] === "liked").map(
                    (id) => (
                      <Txt key={id}>✓ {GAME_INFO[id].title}</Txt>
                    ),
                  )}
                  {!GAME_IDS.some((id) => prefs.ratings[id] === "liked") && (
                    <Txt size={13}>
                      Rate a game after playing to shape your offers.
                    </Txt>
                  )}
                  <Txt weight="extra">Hidden games</Txt>
                  {prefs.hidden.length ? (
                    prefs.hidden.map((id) => (
                      <Row key={id}>
                        <Txt style={{ flex: 1 }}>{GAME_INFO[id].title}</Txt>
                        <Button
                          small
                          tone="pale"
                          onPress={() =>
                            patch({
                              hidden: prefs.hidden.filter((x) => x !== id),
                            })
                          }
                        >
                          Restore
                        </Button>
                      </Row>
                    ))
                  ) : (
                    <Txt size={13}>No hidden games.</Txt>
                  )}
                </>
              )}
              {s === "Family and care circle" && (
                <>
                  <Txt>Choose who sees your record.</Txt>
                  <Button
                    tone="pale"
                    onPress={() => router.push("/care-circle")}
                  >
                    Invite someone
                  </Button>
                </>
              )}
              {s === "Your data" && (
                <>
                  <Button tone="pale" onPress={exportReport}>
                    Export report for my doctor
                  </Button>
                  <Button tone="pale" onPress={exportData}>
                    Download my data
                  </Button>
                  <Button tone="ghost" onPress={() => router.push("/privacy")}>
                    Privacy and research sharing
                  </Button>
                  <Button
                    tone="ghost"
                    onPress={() =>
                      Alert.alert(
                        "Pitch data only",
                        "This prototype has a fictional local profile. Use Presenter controls to reset the demonstration; no cloud account exists.",
                      )
                    }
                  >
                    Delete my account and data
                  </Button>
                </>
              )}
              {s === "Help" && (
                <>
                  <Button tone="pale" onPress={() => router.push("/help")}>
                    Help assistant
                  </Button>
                  <Button
                    tone="ghost"
                    onPress={() =>
                      Alert.alert(
                        "Team demo",
                        "Use your hackathon team’s support channel. This prototype does not send a support message.",
                      )
                    }
                  >
                    Contact support
                  </Button>
                  <Button tone="ghost" onPress={() => router.push("/pitch")}>
                    About this app / Presenter controls
                  </Button>
                </>
              )}
            </View>
          )}
        </View>
      ))}
      {space(16)}
      <Button
        tone="ghost"
        onPress={() => {
          patch({ onboarded: false });
          router.replace("/onboarding/0");
        }}
      >
        Sign out
      </Button>
    </Screen>
  );
}
