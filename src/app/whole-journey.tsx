import React, { useRef, useEffect } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Forest } from "../components/art";
import { Txt, Row, CircleButton } from "../components/ui";
import { C } from "../lib/theme";
import { YEAR } from "../lib/store";
export default function Whole() {
  const { month } = useLocalSearchParams<{ month: string }>(),
    ref = useRef<ScrollView>(null),
    width = Math.min(useWindowDimensions().width - 24, 440);
  useEffect(() => {
    ref.current?.scrollTo({
      x: Number(month || 0) * (width + 12),
      animated: false,
    });
  }, [month, width]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.white, paddingTop: 12 }}>
      <Row style={{ paddingHorizontal: 20, marginBottom: 28 }}>
        <CircleButton
          name="arrow-back"
          label="Back to month view"
          onPress={() => router.back()}
        />
        <Txt size={25} weight="extra">
          Whole Journey
        </Txt>
      </Row>
      <Txt
        size={14}
        color={C.muted}
        style={{ paddingHorizontal: 20, marginBottom: 30 }}
      >
        One fictional year, always moving forward.
      </Txt>
      <ScrollView
        ref={ref}
        horizontal
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 12,
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator
      >
        {YEAR.months.map((m, i) => (
          <View key={m.key} style={{ gap: 15 }}>
            <Forest month={i} width={width} whole />
            <Txt style={{ textAlign: "center" }} weight="bold">
              Month {i + 1} · {m.label}
            </Txt>
          </View>
        ))}
      </ScrollView>
      <Txt size={12} color={C.muted} style={{ padding: 22 }}>
        Scroll through the months. Fuller and lighter foliage reflect the
        scripted demo.
      </Txt>
    </SafeAreaView>
  );
}
