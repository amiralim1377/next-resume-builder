"use server";

import { ActionResponse } from "../../domain/types/action-response";
import { LocalDiskStorageService } from "../../infrastructure/services/local-disk-storage.service";

const storageService = new LocalDiskStorageService();

export async function uploadProfileImageAction(
  formData: FormData,
): Promise<ActionResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return {
        success: false,
        error: "error_noFileProvided",
        statusCode: 400,
      };
    }

    const fileUrl = await storageService.upload(file);

    return {
      success: true,
      data: { url: fileUrl },
      statusCode: 201,
    };
  } catch (error) {
    console.error("❌ [Server Action Upload Error]:", error);
    return {
      success: false,
      error: "error_uploadFailed",
      statusCode: 500,
    };
  }
}
