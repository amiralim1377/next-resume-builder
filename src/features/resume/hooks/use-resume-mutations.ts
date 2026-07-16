import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createResumeAction,
  saveResumeStepAction,
} from "@/modules/resume-builder/application/actions/resume.actions";
import { ResumeStep } from "@/modules/resume-builder/domain/dtos/resume.dto";
import { uploadProfileImageAction } from "@/modules/resume-builder/application/actions/upload.actions";

export function useCreateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await createResumeAction(userId);

      if (!response.success) {
        throw new Error(response.error || "Failed to create resume");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}

interface SaveStepVariables {
  resumeId: string;
  step: ResumeStep;
  data: unknown;
}

export function useSaveResumeStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ resumeId, step, data }: SaveStepVariables) => {
      const response = await saveResumeStepAction(resumeId, step, data);

      if (!response.success) {
        throw new Error(response.error || `Failed to save ${step}`);
      }

      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["resume", variables.resumeId],
      });

      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}

export function useUploadProfileImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadProfileImageAction(formData);

      if (!result.success) {
        throw new Error(result.error || "uploadFailed");
      }

      return result.data.url;
    },
  });
}
