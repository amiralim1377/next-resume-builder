import prisma from "@/lib/prisma";
import { IResumeRepository } from "../../domain/ports/resume.repository.interface";
import { ResumeDto, ResumeStep } from "../../domain/dtos/resume.dto";
import { ResumeMapper } from "../mappers/resume.mapper";

export class PrismaResumeRepository implements IResumeRepository {
  async findById(id: string): Promise<ResumeDto | null> {
    const rawResume = await prisma.resume.findUnique({
      where: { id },
    });

    return rawResume ? ResumeMapper.toDto(rawResume) : null;
  }

  async findByUserId(userId: string): Promise<ResumeDto[]> {
    const rawResumes = await prisma.resume.findMany({
      where: { userId },
    });

    return rawResumes.map(ResumeMapper.toDto);
  }

  async create(userId: string, shortId: string): Promise<ResumeDto> {
    const rawResume = await prisma.resume.create({
      data: {
        userId,
        shortId,
      },
    });

    return ResumeMapper.toDto(rawResume);
  }

  async updateStep(
    id: string,
    step: ResumeStep,
    data: unknown,
  ): Promise<ResumeDto> {
    const rawResume = await prisma.resume.update({
      where: { id },
      data: {
        [step]: data ?? null,
      },
    });

    return ResumeMapper.toDto(rawResume);
  }

  async delete(id: string): Promise<void> {
    await prisma.resume.delete({
      where: { id },
    });
  }

  async findByShortId(shortId: string): Promise<ResumeDto | null> {
    const rawResume = await prisma.resume.findUnique({
      where: { shortId },
    });

    return rawResume ? ResumeMapper.toDto(rawResume) : null;
  }
}
