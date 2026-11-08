import { Platform, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { File, Paths } from "expo-file-system";
import { YEAR } from "./store";
import { reportHtml } from "./report";
// Base path when hosted under a sub-folder (e.g. GitHub Pages /<repo>/).
const BASE = (process.env.EXPO_PUBLIC_BASE_URL || "").replace(/\/$/, "");
export async function exportReport() {
  try {
    if (Platform.OS === "web") {
      window.open(BASE + "/downloads/Memory-Garden-Synthetic-Year-Report.pdf", "_blank", "noopener,noreferrer");
      return;
    }
    const { uri } = await Print.printToFileAsync({ html: reportHtml() });
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share synthetic-year report",
    });
  } catch {
    Alert.alert(
      "Report available",
      "The full report is available inside the app. Sharing may be unavailable on this device.",
    );
  }
}
export async function exportData() {
  try {
    if (Platform.OS === "web") {
      const a = document.createElement("a");
      a.href = BASE + "/downloads/evelyn-synthetic-year.json";
      a.download = "evelyn-synthetic-year.json";
      a.click();
      return;
    }
    const file = new File(Paths.cache, "memory-garden-synthetic-year.json");
    file.write(JSON.stringify(YEAR, null, 2));
    await Sharing.shareAsync(file.uri, {
      mimeType: "application/json",
      dialogTitle: "Share synthetic-year data",
    });
  } catch {
    Alert.alert(
      "Dataset is bundled",
      "The source archive includes the complete synthetic fixture and CSV/JSON exports.",
    );
  }
}
