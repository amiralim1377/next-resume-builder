import { ResumeDto, ResumeStep } from "../dtos/resume.dto";

export interface IResumeRepository {
  findById(id: string): Promise<ResumeDto | null>;

  findByUserId(userId: string): Promise<ResumeDto[]>;

  create(userId: string, shortId: string): Promise<ResumeDto>;

  updateStep(id: string, step: ResumeStep, data: unknown): Promise<ResumeDto>;

  delete(id: string): Promise<void>;

  findByShortId(shortId: string): Promise<ResumeDto | null>;
}
