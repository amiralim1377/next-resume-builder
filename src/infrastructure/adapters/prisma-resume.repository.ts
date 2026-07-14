import { IResumeRepository } from "@/domain/ports/resume-repository.interface";
import prisma from "@/lib/prisma";
import { Resume } from "@/generated/prisma/client";

export class PrismaResumeRepository implements IResumeRepository {
  async findById(id: string): Promise<Resume | null> {
    return prisma.resume.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Resume[]> {
    return prisma.resume.findMany({
      where: { userId },
    });
  }

  async create(userId: string): Promise<Resume> {
    return prisma.resume.create({
      data: {
        userId,
      },
    });
  }

  async updateStep(id: string, step: string, data: unknown): Promise<Resume> {
    return prisma.resume.update({
      where: { id },
      data: {
        [step]: data ?? null,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.resume.delete({
      where: { id },
    });
  }
}
