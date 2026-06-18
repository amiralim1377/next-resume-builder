module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // ویژگی جدید
        "fix", // رفع باگ
        "docs", // تغییر مستندات
        "style", // تغییرات ظاهری کد
        "refactor", // بازنویسی کد
        "test", // اضافه کردن تست
        "chore", // کارهای متفرقه
        "revert", // برگشت به commit قبلی
      ],
    ],
  },
};
