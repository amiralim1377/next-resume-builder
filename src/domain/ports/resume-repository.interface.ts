import { Resume } from "@/generated/prisma/client";

export interface IResumeRepository {
  findById(id: string): Promise<Resume | null>;
  findByUserId(userId: string): Promise<Resume[]>;
  create(userId: string): Promise<Resume>;
  updateStep(id: string, step: string, data: unknown): Promise<Resume>;
  delete(id: string): Promise<void>;
}
