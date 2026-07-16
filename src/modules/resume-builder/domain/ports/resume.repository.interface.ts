import { Resume } from "@/generated/prisma/client";

export interface IResumeRepository {
  findById(id: string): Promise<Resume | null>;
  findByUserId(userId: string): Promise<Resume[]>;
  create(userId: string, shortId: string): Promise<Resume>;
  updateStep(id: string, step: string, data: unknown): Promise<Resume>;
  delete(id: string): Promise<void>;
  findByShortId(shortId: string): Promise<Resume | null>;
}
