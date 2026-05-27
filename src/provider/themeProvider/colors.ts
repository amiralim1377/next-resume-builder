import { ColorPalette } from "./types";

export const COLORS: {
  darkTheme: Partial<ColorPalette>;
  lightTheme: Partial<ColorPalette>;
} = {
  // --- DARK THEME ---
  darkTheme: {
    brand: {
      brandLight: "#b6a5e0" /* Lighter shade */,
      brandPrimary: "#5a3eb5",
      brandHover: "#9378d1", // Slightly lighter for dark mode hover visibility
      brandActive: "#5a3eb5" /* Darker active state */,
    },
    accent: {
      /* Brand Accents - Dark Mode (Deep dark purples) */
      accentLight: "#332561",
      accent: "#211645", // Soft purple for subtle accents
      accentDark: "#160e2e" /* Extremely dark */,
    },
    text: {
      primary: "#F9FAFB", // Near white for high readability
      secondary: "#D1D5DB", // Light gray for secondary text
      muted: "#9CA3AF", // Medium gray for placeholders/disabled
      inverse: "#111827", // Dark text for inside primary buttons
      brandText: "#d4cbed",
      brandTextHover: "#b6a5e0",
      textTertiary: "#b9b5f5",
    },
    state: {
      success: "#10B981", // Emerald green
      error: "#EF4444", // Red
      warning: "#F59E0B", // Amber
      info: "#3B82F6", // Blue
    },
    ui: {
      background: "#111827", // Deep slate for main app background
      surface: "#1F2937", // Slightly lighter slate for cards/panels
      border: "#374151", // Subtle dark borders
      divider: "#1F2937",
    },
    reverse: {
      text: {
        primary: "#111827",
        secondary: "#4B5563",
        muted: "#9CA3AF",
        inverse: "#FFFFFF",
        brandText: "#e5dff7",
        brandTextHover: "#c9bbea",
      },
      ui: {
        background: "#F9FAFB",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        divider: "#F3F4F6",
      },
    },
  },
  lightTheme: {
    brand: {
      brandLight: "#9378d1" /* Lighter shade */,
      brandPrimary: "#5a3eb5",
      brandHover: "#483291", // Slightly lighter for dark mode hover visibility
      brandActive: "#3d2a7a",
    },
    accent: {
      /* Brand Accents - Dark Mode (Deep dark purples) */
      accentLight: "#f4f2fa",
      accent: "#e9e5f5", // Soft purple for subtle accents
      accentDark: "#d4cbed" /* Extremely dark */,
    },
    text: {
      primary: "#111827", // Near black for crisp reading
      secondary: "#4B5563", // Dark gray for subheadings
      muted: "#9CA3AF", // Medium gray for placeholders
      inverse: "#FFFFFF", // White text for inside primary buttons
      brandText: "#e5dff7",
      brandTextHover: "#c9bbea",
      textTertiary: "#4f46e5",
    },
    state: {
      success: "#059669", // Slightly darker emerald for light bg
      error: "#DC2626", // Slightly darker red
      warning: "#D97706", // Darker amber
      info: "#2563EB", // Darker blue
    },
    ui: {
      background: "#F9FAFB", // Very soft gray, easier on eyes than pure white
      surface: "#FFFFFF", // Pure white for resume preview and cards
      border: "#E5E7EB", // Clean, light borders
      divider: "#F3F4F6",
    },
    reverse: {
      text: {
        primary: "#F9FAFB",
        secondary: "#D1D5DB",
        muted: "#9CA3AF",
        inverse: "#111827",
        brandText: "#d4cbed",
        brandTextHover: "#b6a5e0",
      },
      ui: {
        background: "#111827",
        surface: "#1F2937",
        border: "#374151",
        divider: "#1F2937",
      },
    },
  },
};
