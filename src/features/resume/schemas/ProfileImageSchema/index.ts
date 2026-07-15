import { TFunction } from "i18next";
import * as z from "zod/v4";

export const createProfileImageSchema = (t: TFunction<string, undefined>) => {
  return z
    .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
    .refine(
      (value) => {
        if (!(value instanceof File)) return true;

        return value.size <= 2 * 1024 * 1024;
      },
      {
        message: t("imageMaxSize", { size: "2MB" }),
      },
    )
    .refine(
      (value) => {
        if (!(value instanceof File)) return true;

        return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
      },
      {
        message: t("imageFormat"),
      },
    );
};
