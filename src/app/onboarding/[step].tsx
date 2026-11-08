import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Screen,
  Txt,
  Button,
  Heading,
  Card,
  Field,
  Chips,
  Toggle,
  Row,
  CircleButton,
  Kicker,
  space,
} from "../../components/ui";
import { Accessibility, Reminders } from "../../components/settings";
import { Cloud } from "../../components/art";
import { C } from "../../lib/theme";
import { useApp, DEMO_PROFILE } from "../../lib/store";
const backgrounds = [
  "Hispanic or Latino",
  "Black or African American",
  "Asian",
  "American Indian or Alaska Native",
  "Native Hawaiian or Pacific Islander",
  "White",
  "Middle Eastern or North African",
  "Another background",
  "Prefer not to say",
];
export default function Onboarding() {
  const { step: raw } = useLocalSearchParams<{ step: string }>(),
    step = Number(raw || 0),
    { prefs, patch, start, resetPitch } = useApp(),
    [consent, setConsent] = useState(false),
    [password, setPassword] = useState(""),
    [show, setShow] = useState(false),
    [lang, setLang] = useState(false);
  const next = () => router.push(`/onboarding/${step + 1}` as any),
    home = () => {
      patch({ onboarded: true });
      router.replace("/(tabs)");
    },
    openDemo = () => {
      resetPitch();
      patch(DEMO_PROFILE);
      router.replace("/(tabs)");
    };
  if (step === 0)
    return (
      <Screen help={false}>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button tone="pale" small onPress={() => setLang(!lang)}>
            {prefs.language} ⌄
          </Button>
        </Row>
        {lang && (
          <Chips
            options={["English", "Español"]}
            value={prefs.language}
            onSelect={(language: string) => {
              patch({ language });
              setLang(false);
            }}
          />
        )}
        <View style={{ alignItems: "center", marginTop: 36, marginBottom: 24 }}>
          <Cloud size={190} />
        </View>
        <Heading sub="Short games that follow your memory, attention and language over time.">
          Check in on your brain, a few minutes at a time
        </Heading>
        {space(18)}
        <Card color={C.pale}>
          <Txt>
            A check-in, not a diagnosis. It helps you decide when to talk to a
            doctor.
          </Txt>
        </Card>
        {space(26)}
        <Button
          tone="coral"
          onPress={() => {
            if (prefs.demo) resetPitch();
            next();
          }}
        >
          Get started
        </Button>
        {space(10)}
        <Button tone="ghost" onPress={() => router.push("/onboarding/1")}>
          I already have an account
        </Button>
        {space(16)}
        <Button tone="pale" icon="play-outline" onPress={openDemo}>
          Open pitch demo
        </Button>
        {space(12)}
        <Txt size={11} color={C.muted} style={{ textAlign: "center" }}>
          BROWSER PITCH PROTOTYPE · FICTIONAL PROFILE
        </Txt>
      </Screen>
    );
  const titles = [
    "",
    "Create your account",
    "Your privacy, in plain words",
    "A little about you",
    "Your background",
    "Make it comfortable",
    "How it works",
    "Want a gentle reminder?",
  ];
  return (
    <Screen back help={false}>
      <Kicker>Step {step} of 7</Kicker>
      {space(12)}
      <Heading>{titles[step]}</Heading>
      {space(12)}
      {step === 1 && (
        <View style={{ gap: 18 }}>
          <Txt color={C.muted}>
            So your results are saved and come with you if you change phones.
          </Txt>
          <Field
            label="Email"
            value={prefs.email}
            onChangeText={(email: string) => patch({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            secureTextEntry={!show}
          />
          <Button small tone="ghost" onPress={() => setShow(!show)}>
            {show ? "Hide password" : "Show password"}
          </Button>
          <Button tone="coral" onPress={next}>
            Create account
          </Button>
          <Txt style={{ textAlign: "center" }} color={C.muted}>
            or
          </Txt>
          <Button icon="logo-apple" tone="pale" onPress={next}>
            Continue with Apple
          </Button>
          <Button icon="logo-google" tone="pale" onPress={next}>
            Continue with Google
          </Button>
          <Button tone="ghost" onPress={next}>
            Someone is helping me set up
          </Button>
          <Txt size={11} color={C.muted}>
            Pitch flow only: these buttons open a local demo profile. No cloud
            account is created; passwords are not saved.
          </Txt>
        </View>
      )}
      {step === 2 && (
        <View style={{ gap: 18 }}>
          <Card color={C.pale}>
            <Txt>We save your game results and answers.</Txt>
            <Txt>Only you see them. You choose who else can.</Txt>
          </Card>
          <Txt weight="extra">Your data stays with you.</Txt>
          <Txt>You can volunteer it for research.</Txt>
          <Toggle
            label="I agree to the Terms and Privacy Policy. I understand this app does not diagnose any condition."
            description="Required · prototype acknowledgment"
            value={consent}
            onChange={setConsent}
          />
          <Toggle
            label="Share anonymous results to help research"
            description="Optional. Off by default. Change anytime."
            value={prefs.research}
            onChange={(research: boolean) => patch({ research })}
          />
          <Txt size={12} color={C.muted}>
            Consent controls are demonstrated locally. No data is transmitted
            for research in this pitch build.
          </Txt>
          <Button disabled={!consent} tone="coral" onPress={next}>
            Agree and continue
          </Button>
        </View>
      )}
      {step === 3 && (
        <View style={{ gap: 20 }}>
          <Txt color={C.muted}>
            This helps us compare your results fairly. Skip anything you like.
          </Txt>
          <Field
            label="First name"
            value={prefs.name}
            onChangeText={(name: string) => patch({ name })}
            placeholder="Optional"
          />
          <Txt weight="extra">Your age</Txt>
          <Chips
            options={["Under 45", "45–54", "55–64", "65–74", "75 or older"]}
            value={prefs.age}
            onSelect={(age: string) => patch({ age })}
          />
          <Txt weight="extra">Sex assigned at birth</Txt>
          <Chips
            options={["Female", "Male", "Other", "Prefer not to say"]}
            value={prefs.sex}
            onSelect={(sex: string) => patch({ sex })}
          />
          <Txt weight="extra">Who is this for?</Txt>
          <Chips
            options={["Me", "Someone I care for"]}
            value={prefs.role}
            onSelect={(role: string) => patch({ role })}
          />
          <Button tone="coral" onPress={next}>
            Continue
          </Button>
          <Button tone="ghost" onPress={next}>
            Skip for now
          </Button>
        </View>
      )}
      {step === 4 && (
        <View style={{ gap: 20 }}>
          <Txt weight="extra">Race or ethnicity</Txt>
          <Txt color={C.muted}>Pick all that apply.</Txt>
          <Chips
            options={backgrounds}
            value={prefs.backgrounds}
            multiple
            onSelect={(v: string) =>
              patch({
                backgrounds:
                  v === "Prefer not to say"
                    ? ["Prefer not to say"]
                    : prefs.backgrounds.includes(v)
                      ? prefs.backgrounds.filter((s) => s !== v)
                      : [
                          ...prefs.backgrounds.filter(
                            (s) => s !== "Prefer not to say",
                          ),
                          v,
                        ],
              })
            }
          />
          <Txt weight="extra">Schooling · optional</Txt>
          <Chips
            options={[
              "High school or less",
              "Some college",
              "College degree",
              "Graduate degree",
              "Prefer not to say",
            ]}
            value={prefs.schooling}
            onSelect={(schooling: string) => patch({ schooling })}
          />
          <Card color={C.pale}>
            <Txt weight="extra">Why we ask</Txt>
            <Txt>
              These optional questions help plan fairness checks. They do not
              adjust scores in this prototype.
            </Txt>
          </Card>
          <Button tone="coral" onPress={next}>
            Continue
          </Button>
        </View>
      )}
      {step === 5 && (
        <View style={{ gap: 24 }}>
          <Accessibility />
          <Button tone="coral" onPress={next}>
            Continue
          </Button>
        </View>
      )}
      {step === 6 && (
        <View style={{ gap: 22 }}>
          {[
            [
              "Play one session",
              "Each session is around 8 minutes of fun games",
            ],
            ["Come back 3 times a week", "A little goes a long way."],
            [
              "Check your progress",
              "After 4 weeks, see how you are doing. After 6 months, get your full report.",
            ],
          ].map(([h, p], i) => (
            <Row key={h} style={{ alignItems: "flex-start" }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: [C.blue, C.coral, C.amber][i],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Txt weight="extra">{i + 1}</Txt>
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <Txt weight="extra" size={18}>
                  {h}
                </Txt>
                <Txt color={C.muted}>{p}</Txt>
              </View>
            </Row>
          ))}
          <Txt weight="extra" size={21}>
            What we evaluate
          </Txt>
          <Chips
            options={["Visual", "Language", "Attention", "Memory"]}
            value=""
            onSelect={() => {}}
          />
          <Txt size={12} color={C.muted}>
            The latest five games use game-performance proxies. No diagnosis or
            validated clinical baseline is produced.
          </Txt>
          <Button tone="coral" onPress={next}>
            Continue
          </Button>
        </View>
      )}
      {step === 7 && (
        <View style={{ gap: 22 }}>
          <Txt>Pick the days that suit you. We nudge once, never nag.</Txt>
          <Reminders />
          <Card color={C.pale}>
            <Txt weight="extra">Your first session builds your baseline.</Txt>
            <Txt>A practice round comes first. Practice is never scored.</Txt>
          </Card>
          <Button
            tone="coral"
            onPress={() => {
              patch({ onboarded: true });
              start();
              router.replace("/workout");
            }}
          >
            Start my first session
          </Button>
          <Button tone="ghost" onPress={home}>
            Not now, take me Home
          </Button>
        </View>
      )}
    </Screen>
  );
}
