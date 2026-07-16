"use server";

import { revalidatePath } from "next/cache";
import { Resume } from "@/generated/prisma/client";

import { customAlphabet } from "nanoid";
import { ResumeDraftValidator } from "@/modules/resume-builder/domain/schemas/validators/resume/resume-draft.validator";
import { ResumeFinalValidator } from "@/modules/resume-builder/domain/schemas/validators/resume/resume-final.validator";
import { PrismaResumeRepository } from "../../infrastructure/repositories/prisma-resume.repository";
import { ResumeStep } from "../../domain/dtos/resume.dto";
import { ActionResponse } from "../../domain/types/action-response";

const resumeRepository = new PrismaResumeRepository();

const generateShortId = customAlphabet(
  "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  8,
);
export async function createResumeAction(
  userId: string,
): Promise<ActionResponse<Resume>> {
  try {
    const shortId = generateShortId();
    const newResume = await resumeRepository.create(userId, shortId);
    revalidatePath("/resumes");

    return {
      success: true,
      data: newResume,
    };
  } catch (error) {
    // لاگ کردن خطای سیستمی فقط در سمت سرور جهت امنیت و دیباگ
    console.error("❌ Error creating resume:", error);

    return {
      success: false,
      error: "error_createResumeFailed",
    };
  }
}

/**
 * ۲. ذخیره خودکار و گام‌به‌گام پیش‌نویس رزومه (منعطف)
 * این متد دیتای ناقص را بدون ایراد گرفتن در دیتابیس ذخیره می‌کند.
 */
export async function saveResumeStepAction(
  resumeId: string,
  step: ResumeStep,
  data: unknown,
): Promise<ActionResponse<Resume>> {
  try {
    // اعتبارسنجی اولیه ساختار درخواست (فقط تایید آیدی و مرحله)
    const parsedData = ResumeDraftValidator.safeParse({ resumeId, step, data });

    if (!parsedData.success) {
      return {
        success: false,
        error: "error_invalidRequestStructure",
      };
    }

    // ذخیره داده‌های دریافتی در PostgreSQL
    const updatedResume = await resumeRepository.updateStep(
      parsedData.data.resumeId,
      parsedData.data.step,
      parsedData.data.data,
    );

    return {
      success: true,
      data: updatedResume,
    };
  } catch (error: unknown) {
    // چاپ خطای کامل در ترمینال سرور
    console.error("❌ [SERVER ERROR DETAILS]:", error);

    // استخراج امن پیام خطا به جای استفاده از any
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    return {
      success: false,
      // 🔥 ارسال خطای واقعی دیتابیس به کلاینت (به جای کلید ترجمه)
      // با کست کردن کل آبجکت خروجی، تایپ‌اسکریپت و ESLint هر دو راضی می‌شوند
      error: `🔴 PRISMA_ERROR: ${errorMessage}`,
    } as ActionResponse<Resume>;
  }
}

/**
 * ۳. بررسی سخت‌گیرانه و ثبت نهایی رزومه (مرحله ششم)
 * این متد کل فیلدهای رزومه را از دیتابیس خوانده و با اسکیمای سخت‌گیرانه نهایی می‌سنجد.
 */
export async function finalizeResumeAction(
  resumeId: string,
): Promise<ActionResponse<Resume>> {
  try {
    // دریافت دیتای کامل رزومه از دیتابیس
    const resume = await resumeRepository.findById(resumeId);

    if (!resume) {
      return {
        success: false,
        error: "error_resumeNotFound",
      };
    }

    // اعتبارسنجی سخت‌گیرانه تمام بخش‌های ذخیره‌شده رزومه
    const parsedData = ResumeFinalValidator.safeParse({
      resumeId: resume.id,
      basicInfo: resume.basicInfo,
      education: resume.education,
      job: resume.job,
      skills: resume.skills,
      coursesAndCertifications: resume.coursesAndCertifications,
      projects: resume.projects,
      research: resume.research,
    });

    if (!parsedData.success) {
      // بازگرداندن کلید خطای عدم تکمیل اطلاعات به کلاینت
      return {
        success: false,
        error: "error_incompleteResumeData",
      };
    }

    // در اینجا می‌توانید وضعیت رزومه را در دیتابیس به "PUBLISHED" یا "COMPLETED" تغییر دهید
    // await resumeRepository.publish(resumeId);

    revalidatePath("/resumes");

    return {
      success: true,
      data: resume,
    };
  } catch (error) {
    console.error("❌ Error finalising resume:", error);

    return {
      success: false,
      error: "error_finaliseFailed",
    };
  }
}
