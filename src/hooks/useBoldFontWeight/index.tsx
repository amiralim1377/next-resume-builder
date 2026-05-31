import { BOLD_FONT_WEIGHTS } from "@/core/constants/constant";
import { IFontWeight } from "@/core/constants/types";
import { useLang } from "@/provider/lngProvider";

const useBoldFontWeight = () => {
  const { lng } = useLang();

  const fontWeight: IFontWeight =
    lng === "en" || BOLD_FONT_WEIGHTS ? "bold" : "normal";
  return { fontWeight };
};

export { useBoldFontWeight };
