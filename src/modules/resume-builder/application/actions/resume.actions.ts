"use server";

import { revalidatePath } from "next/cache";
import { customAlphabet } from "nanoid";
import {
  ResumeDto,
  ResumeStep,
} from "@/modules/resume-builder/domain/dtos/resume.dto";
import { ActionResponse } from "@/modules/resume-builder/domain/types/action-response";
import { ResumeDraftValidator } from "@/modules/resume-builder/domain/schemas/validators/resume/resume-draft.validator";
import { ResumeFinalValidator } from "@/modules/resume-builder/domain/schemas/validators/resume/resume-final.validator";
import { ResumeService } from "@/modules/resume-builder/application/services/resume.service";

const resumeService = new ResumeService();

const generateShortId = customAlphabet(
  "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  8,
);

export async function createResumeAction(
  userId: string,
): Promise<ActionResponse<ResumeDto>> {
  try {
    const shortId = generateShortId();

    const newResume = await resumeService.createResume(userId, shortId);

    revalidatePath("/resumes");

    return {
      success: true,
      data: newResume,
    };
  } catch (error) {
    console.error("❌ Error creating resume:", error);
    return {
      success: false,
      error: "error_createResumeFailed",
    };
  }
}

export async function saveResumeStepAction(
  resumeId: string,
  step: ResumeStep,
  data: unknown,
): Promise<ActionResponse<ResumeDto>> {
  try {
    const parsedData = ResumeDraftValidator.safeParse({ resumeId, step, data });

    if (!parsedData.success) {
      return {
        success: false,
        error: "error_invalidRequestStructure",
      };
    }

    const updatedResume = await resumeService.saveStep(
      parsedData.data.resumeId,
      parsedData.data.step,
      parsedData.data.data,
    );

    return {
      success: true,
      data: updatedResume,
    };
  } catch (error: unknown) {
    console.error("❌ [SERVER ERROR DETAILS]:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    return {
      success: false,
      error: `🔴 PRISMA_ERROR: ${errorMessage}`,
    };
  }
}

export async function finalizeResumeAction(
  resumeId: string,
): Promise<ActionResponse<ResumeDto>> {
  try {
    const resume = await resumeService.getResumeById(resumeId);

    if (!resume) {
      return {
        success: false,
        error: "error_resumeNotFound",
      };
    }

    const parsedData = ResumeFinalValidator.safeParse(resume);

    if (!parsedData.success) {
      return {
        success: false,
        error: "error_incompleteResumeData",
      };
    }

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
