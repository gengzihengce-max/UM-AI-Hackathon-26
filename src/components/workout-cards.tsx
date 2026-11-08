import React from "react";
import { View, Pressable } from "react-native";
import { router } from "expo-router";
import { GAME_INFO, C } from "../lib/theme";
import { useApp } from "../lib/store";
import { Txt, Icon, Row, Kicker } from "./ui";
export function WorkoutCards({ compact = false }: { compact?: boolean }) {
  const { plan, setPractice } = useApp();
  const current = plan.games.find((g) => !plan.done.includes(g));
  return (
    <View style={{ gap: 12 }}>
      {plan.games.map((id, i) => {
        const done = plan.done.includes(id),
          visible = done || id === current,
          g = GAME_INFO[id];
        return (
          <Pressable
            key={id}
            disabled={!visible || done}
            accessibilityRole="button"
            accessibilityLabel={
              done
                ? g.title + ", done"
                : visible
                  ? g.title + ", tap to play"
                  : "Mystery game, revealed after the one before"
            }
            onPress={() => {
              setPractice(false);
              router.push({
                pathname: "/instructions",
                params: { game: id, workout: "1" },
              });
            }}
            style={{
              borderRadius: 28,
              backgroundColor: done ? "#E3ECE6" : visible ? g.color : C.soft,
              padding: compact ? 16 : 20,
              minHeight: compact ? 88 : 116,
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: C.white,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {visible ? (
                <Icon name={done ? "checkmark" : g.icon} size={25} />
              ) : (
                <Txt weight="extra" size={30}>
                  ?
                </Txt>
              )}
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Txt weight="extra" size={compact ? 16 : 19}>
                {visible ? g.title : "Mystery game"}
              </Txt>
              <Txt size={12}>
                {done
                  ? "Done"
                  : visible
                    ? g.area + " · Touch"
                    : "Revealed after the one before"}
              </Txt>
            </View>
            {visible && !done && <Icon name="arrow-forward" />}
          </Pressable>
        );
      })}
    </View>
  );
}
