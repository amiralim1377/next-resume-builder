import { Resume as PrismaResume } from "@/generated/prisma/client";
import { ResumeDto } from "../../domain/dtos/resume.dto";

export class ResumeMapper {
  static toDto(prismaResume: PrismaResume): ResumeDto {
    return {
      id: prismaResume.id,
      shortId: prismaResume.shortId,
      userId: prismaResume.userId,
      createdAt: prismaResume.createdAt,
      updatedAt: prismaResume.updatedAt,
      profileImage: prismaResume.profileImage ?? null,
      basicInfo: prismaResume.basicInfo ?? {},

      education: Array.isArray(prismaResume.education)
        ? prismaResume.education
        : [],
      job: Array.isArray(prismaResume.job) ? prismaResume.job : [],
      skills: Array.isArray(prismaResume.skills) ? prismaResume.skills : [],
      coursesAndCertifications: Array.isArray(
        prismaResume.coursesAndCertifications,
      )
        ? prismaResume.coursesAndCertifications
        : [],
      projects: Array.isArray(prismaResume.projects)
        ? prismaResume.projects
        : [],
      research: Array.isArray(prismaResume.research)
        ? prismaResume.research
        : [],
    };
  }
}
