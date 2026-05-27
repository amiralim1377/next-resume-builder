export type ColorPalette = {
  brand: {
    brandLight: string;
    brandPrimary: string;
    brandHover: string;
    brandActive: string;
  };
  accent: {
    accentLight: string;
    accent: string;
    accentDark: string;
  };
  ui: {
    background: string;
    surface: string;
    border: string;
    divider: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    brandText: string;
    brandTextHover: string;
    textTertiary: string;
  };
  state: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  reverse: {
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
      brandText: string;
      brandTextHover: string;
    };
    ui: {
      background: string;
      surface: string;
      border: string;
      divider: string;
    };
  };
};
