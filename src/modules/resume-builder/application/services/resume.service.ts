import { IResumeRepository } from "../../domain/ports/resume.repository.interface";
import { PrismaResumeRepository } from "../../infrastructure/repositories/prisma-resume.repository";
import { ResumeDto, ResumeStep } from "../../domain/dtos/resume.dto";

export class ResumeService {
  private resumeRepository: IResumeRepository;

  constructor() {
    this.resumeRepository = new PrismaResumeRepository();
  }

  async createResume(userId: string, shortId: string): Promise<ResumeDto> {
    return await this.resumeRepository.create(userId, shortId);
  }

  async saveStep(
    resumeId: string,
    step: ResumeStep,
    data: unknown,
  ): Promise<ResumeDto> {
    return await this.resumeRepository.updateStep(resumeId, step, data);
  }

  async getResumeById(resumeId: string): Promise<ResumeDto | null> {
    return await this.resumeRepository.findById(resumeId);
  }

  async getResumeByShortId(shortId: string): Promise<ResumeDto | null> {
    return await this.resumeRepository.findByShortId(shortId);
  }
}
