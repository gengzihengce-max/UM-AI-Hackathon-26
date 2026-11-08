import React from "react";
import { View, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Screen,
  Heading,
  Txt,
  Row,
  Icon,
  Button,
  space,
} from "../components/ui";
import { C, CATEGORY_GROUPS, GAME_INFO, GAME_IDS } from "../lib/theme";
import { GamePicture } from "../components/art";
import { useApp } from "../lib/store";
export default function Library() {
  const { area } = useLocalSearchParams<{ area: string }>(),
    { prefs, setPractice } = useApp(),
    ids = (
      CATEGORY_GROUPS.find((g) => g.title === area)?.ids || [...GAME_IDS]
    ).filter((id) => !prefs.hidden.includes(id));
  return (
    <Screen back>
      <Heading sub="Fresh prompts inside every game.">
        {area || "The five games"}
      </Heading>
      {space(16)}
      {ids.map((id) => (
        <Pressable
          key={id}
          accessibilityRole="button"
          accessibilityLabel={"Play " + GAME_INFO[id].title}
          onPress={() => {
            setPractice(false);
            router.push({ pathname: "/instructions", params: { game: id } });
          }}
          style={{ marginBottom: 18, gap: 15 }}
        >
          <GamePicture game={id} />
          <View style={{ paddingHorizontal: 12, gap: 6 }}>
            <Row>
              <Txt size={21} weight="extra" style={{ flex: 1 }}>
                {GAME_INFO[id].title}
              </Txt>
              <Icon name="arrow-forward" />
            </Row>
            <Txt color={C.muted}>{GAME_INFO[id].description}</Txt>
            <Txt size={12}>
              {GAME_INFO[id].duration} · Touch · {GAME_INFO[id].area}
            </Txt>
          </View>
        </Pressable>
      ))}
      {!ids.length && (
        <Txt>These games are hidden. Restore them in Account.</Txt>
      )}
      {space(16)}
      <Button tone="ghost" onPress={() => router.push("/(tabs)/account")}>
        Manage hidden games
      </Button>
    </Screen>
  );
}
