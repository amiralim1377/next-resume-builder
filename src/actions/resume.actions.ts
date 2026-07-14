"use server";

import { revalidatePath } from "next/cache";
import { PrismaResumeRepository } from "@/infrastructure/adapters/prisma-resume.repository";
import { getStepValidator, ResumeStep } from "@/domain/dtos/resume.dto";
import { ActionResponse } from "@/domain/types/action-response";
import { Resume } from "@/generated/prisma/client";

const resumeRepository = new PrismaResumeRepository();

export async function createResumeAction(
  userId: string,
): Promise<ActionResponse<Resume>> {
  try {
    const newResume = await resumeRepository.create(userId);
    revalidatePath("/resumes");
    return {
      success: true,
      data: newResume,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function saveResumeStepAction(
  resumeId: string,
  step: ResumeStep,
  data: unknown,
): Promise<ActionResponse<Resume>> {
  try {
    const validator = getStepValidator(step);
    const validationResult = validator.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Validation failed",
      };
    }

    const existingResume = await resumeRepository.findById(resumeId);
    if (!existingResume) {
      return {
        success: false,
        error: "Resume not found",
      };
    }

    const updatedResume = await resumeRepository.updateStep(
      resumeId,
      step,
      validationResult.data,
    );

    revalidatePath(`/resume/${resumeId}`);
    revalidatePath("/resumes");

    return {
      success: true,
      data: updatedResume,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
