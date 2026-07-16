"use server";

import { revalidatePath } from "next/cache";
import { customAlphabet } from "nanoid";
import {
  ResumeDto,
  ResumeStep,
} from "@/modules/resume-builder/domain/dtos/resume.dto";
import {
  ActionResponse,
  ErrorCode,
} from "@/modules/resume-builder/domain/types/action-response";
import { ResumeService } from "@/modules/resume-builder/application/services/resume.service";
import { ResumeDraftValidator } from "../../domain/validators/resume/resume-draft.validator";
import { ResumeFinalValidator } from "../../domain/validators/resume/resume-final.validator";

const resumeService = new ResumeService();

const generateShortId = customAlphabet(
  "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  8,
);

async function getSecureSessionUserId(): Promise<string | null> {
  return "MOCK_USER_ID";
}

function mapErrorToStatusCode(errorMessage: string): ErrorCode {
  if (
    errorMessage.includes("unauthorizedAccess") ||
    errorMessage === "error_unauthorizedAccess"
  ) {
    return 403;
  }
  if (
    errorMessage.includes("unauthorized") ||
    errorMessage === "error_unauthorized"
  ) {
    return 401;
  }
  if (
    errorMessage.includes("notFound") ||
    errorMessage === "error_resumeNotFound"
  ) {
    return 404;
  }
  if (
    errorMessage.includes("invalid") ||
    errorMessage.includes("incomplete") ||
    errorMessage.includes("Data")
  ) {
    return 422;
  }
  return 500;
}

export async function createResumeAction(
  clientUserId?: string,
): Promise<ActionResponse<ResumeDto>> {
  try {
    const serverUserId = await getSecureSessionUserId();

    if (!serverUserId) {
      return { success: false, error: "error_unauthorized", statusCode: 401 };
    }

    const shortId = generateShortId();
    const newResume = await resumeService.createResume(serverUserId, shortId);

    revalidatePath("/resumes");

    return {
      success: true,
      data: newResume,
      statusCode: 201,
    };
  } catch (error) {
    console.error("❌ Error creating resume:", error);
    return {
      success: false,
      error: "error_createResumeFailed",
      statusCode: 500,
    };
  }
}

export async function saveResumeStepAction(
  resumeId: string,
  step: ResumeStep,
  data: unknown,
): Promise<ActionResponse<ResumeDto>> {
  try {
    const userId = await getSecureSessionUserId();
    if (!userId) {
      return { success: false, error: "error_unauthorized", statusCode: 401 };
    }

    const parsedData = ResumeDraftValidator.safeParse({ resumeId, step, data });

    if (!parsedData.success) {
      return {
        success: false,
        error: "error_invalidRequestStructure",
        statusCode: 401,
      };
    }

    const updatedResume = await resumeService.saveStep(
      userId,
      parsedData.data.resumeId,
      parsedData.data.step,
      parsedData.data.data,
    );

    return {
      success: true,
      data: updatedResume,
      statusCode: 201,
    };
  } catch (error: unknown) {
    console.error("❌ [SERVER ERROR DETAILS]:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    return {
      success: false,
      error: errorMessage.includes("error_")
        ? errorMessage
        : `🔴 SYSTEM_ERROR: ${errorMessage}`,
      statusCode: mapErrorToStatusCode(errorMessage),
    };
  }
}

export async function finalizeResumeAction(
  resumeId: string,
): Promise<ActionResponse<ResumeDto>> {
  try {
    const userId = await getSecureSessionUserId();
    if (!userId) {
      return { success: false, error: "error_unauthorized", statusCode: 401 };
    }

    const resume = await resumeService.getResumeById(resumeId);

    if (!resume) {
      return {
        success: false,
        error: "error_resumeNotFound",
        statusCode: 404,
      };
    }

    if (resume.userId !== userId) {
      return {
        success: false,
        error: "error_unauthorizedAccess",
        statusCode: 403,
      };
    }

    const parsedData = ResumeFinalValidator.safeParse(resume);

    if (!parsedData.success) {
      return {
        success: false,
        error: "error_incompleteResumeData",
        statusCode: 422,
      };
    }

    revalidatePath("/resumes");

    return {
      success: true,
      data: resume,
      statusCode: 200,
    };
  } catch (error) {
    console.error("❌ Error finalising resume:", error);
    const errorMessage =
      error instanceof Error ? error.message : "error_finaliseFailed";
    return {
      success: false,
      error: errorMessage,
      statusCode: mapErrorToStatusCode(errorMessage),
    };
  }
}
