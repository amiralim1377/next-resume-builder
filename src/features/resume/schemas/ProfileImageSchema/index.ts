import { TFunction } from "i18next";
import { z } from "zod";

export const createProfileImageSchema = (t: TFunction<string, undefined>) => {
  const fileSchema = z.instanceof(File);

  return z
    .union([fileSchema, z.undefined()])
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      },
      {
        message: t("imageMaxSize", { size: "2MB" }),
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      },
      {
        message: t("imageFormat"),
      },
    );
};
