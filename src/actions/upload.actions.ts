"use server";

import fs from "fs/promises";
import path from "path";

export async function uploadProfileImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return { success: false, error: "فایلی دریافت نشد" };
    }

    // تبدیل فایل به Buffer برای ذخیره روی هارد سیستم
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ساخت یک نام منحصر‌به‌فرد برای عکس
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`;

    // مسیر ذخیره‌سازی در پوشه public/uploads پروژه
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // اطمینان از وجود پوشه uploads (اگر نباشد ساخته می‌شود)
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    // آدرس نسبی دسترسی به فایل
    const fileUrl = `/uploads/${uniqueFileName}`;

    return { success: true, url: fileUrl };
  } catch (error) {
    console.error("❌ [Server Action Upload Error]:", error);
    return { success: false, error: "خطا در آپلود و ذخیره فایل" };
  }
}
