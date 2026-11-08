import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { C, F, visionColor } from "../lib/theme";
import { useApp } from "../lib/store";
export function Txt({
  children,
  size = 16,
  weight = "regular",
  color = C.ink,
  style,
  ...props
}: any) {
  const { prefs } = useApp();
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: F[weight as keyof typeof F] || F.regular,
          fontSize: size * prefs.textSize,
          lineHeight: size * prefs.textSize * 1.45,
          color: prefs.contrast && color !== C.white ? "#071523" : color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function Icon({ name, size = 24, color = C.ink }: any) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function Button({
  children,
  onPress,
  tone = "ink",
  icon,
  disabled = false,
  small = false,
  style,
  accessibilityLabel,
}: any) {
  const {prefs}=useApp();
  const bg =
    tone === "ink"
      ? C.ink
      : tone === "coral"
        ? C.coral
        : tone === "blue"
          ? C.blue
          : tone === "amber"
            ? C.amber
            : tone === "ghost"
              ? "transparent"
              : C.pale;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ||
        (typeof children === "string" ? children : undefined)
      }
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: small ? 48 : 60,
          borderRadius: 32,
          backgroundColor: visionColor(bg,prefs.vision),
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 14,
          flexDirection: "row",
          gap: 10,
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {icon && (
        <Icon name={icon} color={tone === "ink" ? C.white : C.ink} size={21} />
      )}
      <Txt
        weight="extra"
        color={tone === "ink" ? C.white : C.ink}
        size={small ? 15 : 18}
        style={{ textAlign: "center", flexShrink: 1 }}
      >
        {children}
      </Txt>
    </Pressable>
  );
}
export function CircleButton({ name, onPress, label }: any) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: C.pale,
        alignItems: "center",
        justifyContent: "center",
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Icon name={name} color="#0B6A91" />
    </Pressable>
  );
}
export function Card({ children, color = C.soft, style }: any) {
 const {prefs}=useApp();
  return (
    <View
      style={[
        { backgroundColor: visionColor(color,prefs.vision), borderRadius: 28, padding: 20, gap: 12 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
export function Row({ children, style }: any) {
  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center", gap: 12 }, style]}
    >
      {children}
    </View>
  );
}
export function Heading({ children, sub }: any) {
  return (
    <View style={{ gap: 8, marginBottom: 8 }}>
      <Txt
        size={30}
        weight="extra"
        style={{ letterSpacing: -0.7 }}
      >
        {children}
      </Txt>
      {sub && <Txt color={C.muted}>{sub}</Txt>}
    </View>
  );
}
export function Kicker({ children, color = C.muted }: any) {
  return (
    <Txt
      size={11}
      color={color}
      weight="extra"
      style={{ letterSpacing: 1.3, textTransform: "uppercase" }}
    >
      {children}
    </Txt>
  );
}
export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  ...props
}: any) {
  return (
    <View style={{ gap: 8 }}>
      <Txt weight="bold">{label}</Txt>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        secureTextEntry={secureTextEntry}
        style={{
          borderWidth: 1.5,
          borderColor: C.line,
          borderRadius: 22,
          minHeight: 58,
          padding: 16,
          fontFamily: F.regular,
          fontSize: 16,
          color: C.ink,
        }}
        {...props}
      />
    </View>
  );
}
export function Chips({ options, value, onSelect, multiple = false }: any) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {options.map((o: string) => {
        const selected = multiple ? value.includes(o) : value === o;
        return (
          <Pressable
            key={o}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onSelect(o)}
            style={{
              minHeight: 48,
              borderRadius: 24,
              paddingHorizontal: 17,
              paddingVertical: 13,
              backgroundColor: selected ? C.blue : C.soft,
            }}
          >
            <Txt size={14} weight={selected ? "extra" : "medium"}>
              {selected ? "✓ " : ""}
              {o}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}
export function Toggle({ label, description, value, onChange }: any) {
  return (
    <Row style={{ justifyContent: "space-between", paddingVertical: 8 }}>
      <View style={{ flex: 1, gap: 3 }}>
        <Txt weight="bold">{label}</Txt>
        {description && (
          <Txt size={13} color={C.muted}>
            {description}
          </Txt>
        )}
      </View>
      <Switch
        accessibilityLabel={label}
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#D0DBE4", true: C.blue }}
        thumbColor={C.white}
      />
    </Row>
  );
}
export function Header({
  back = false,
  title = "Memory Garden",
  help = true,
}: any) {
  return (
    <Row style={{ justifyContent: "space-between", marginBottom: 22 }}>
      {back ? (
        <CircleButton
          name="arrow-back"
          label="Back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/(tabs)")
          }
        />
      ) : (
        <Txt weight="extra" size={20}>
          {title}
        </Txt>
      )}
      {back && (
        <Txt weight="bold" size={15} style={{ flex: 1 }}>
          {title === "Memory Garden" ? "" : title}
        </Txt>
      )}
      {help && (
        <CircleButton
          name="chatbubble-ellipses-outline"
          label="Ask the help assistant"
          onPress={() => router.push("/help")}
        />
      )}
    </Row>
  );
}
export function Screen({
  children,
  back = false,
  title,
  help = true,
  scroll = true,
  footer,
  style,
}: any) {
  const { bottom } = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: C.white }}
      edges={["top", "left", "right"]}
    >
      <View style={{ flex: 1 }}>
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              {
                padding: 20,
                paddingBottom: footer ? 140 : Math.max(34, bottom + 20),
              },
              style,
            ]}
          >
            <Header back={back} title={title} help={help} />
            {children}
          </ScrollView>
        ) : (
          <View style={[{ flex: 1, padding: 20 }, style]}>
            <Header back={back} title={title} help={help} />
            {children}
          </View>
        )}
        {footer}
      </View>
    </SafeAreaView>
  );
}
export function Sheet({ visible, onClose, title, children }: any) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#10243A66",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          accessibilityLabel="Close sheet"
          onPress={onClose}
        />
        <View
          accessibilityViewIsModal
          style={{
            backgroundColor: C.white,
            padding: 26,
            paddingBottom: 42,
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            gap: 18,
          }}
        >
          <Txt size={27} weight="extra">
            {title}
          </Txt>
          {children}
        </View>
      </View>
    </Modal>
  );
}
export const space = (h = 20) => <View style={{ height: h }} />;
