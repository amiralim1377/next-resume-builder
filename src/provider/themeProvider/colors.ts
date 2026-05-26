import { ColorPalette } from "./types";

export const COLORS: {
  darkTheme: Partial<ColorPalette>;
  lightTheme: Partial<ColorPalette>;
} = {
  // --- DARK THEME ---
  darkTheme: {
    brand: {
      brandPrimary: "#5a3eb5",
      primaryHover: "#6e52c8", // Slightly lighter for dark mode hover visibility
      accent: "#8b7ce0", // Soft purple for subtle accents
    },
    text: {
      primary: "#F9FAFB", // Near white for high readability
      secondary: "#D1D5DB", // Light gray for secondary text
      muted: "#9CA3AF", // Medium gray for placeholders/disabled
      inverse: "#111827", // Dark text for inside primary buttons
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
  },

  // --- LIGHT THEME ---
  lightTheme: {
    brand: {
      brandPrimary: "#5a3eb5",
      primaryHover: "#483291", // Slightly darker for light mode hover
      accent: "#e9e5f5", // Very pale purple for subtle highlights/tags
    },
    text: {
      primary: "#111827", // Near black for crisp reading
      secondary: "#4B5563", // Dark gray for subheadings
      muted: "#9CA3AF", // Medium gray for placeholders
      inverse: "#FFFFFF", // White text for inside primary buttons
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
  },
};
