import { ResumeBuilderClient } from "./_components/ResumeBuilderClient";
import { PrismaResumeRepository } from "@/infrastructure/adapters/prisma-resume.repository";
import { notFound } from "next/navigation";

interface BuilderPageProps {
  params: Promise<{
    resumeId: string;
    locale: string;
  }>;
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const resolvedParams = await params;
  const { resumeId: shortId } = resolvedParams;

  const repository = new PrismaResumeRepository();
  const dbResume = await repository.findByShortId(shortId);

  if (!dbResume) {
    notFound();
  }
  return (
    <div className="flex h-full w-full overflow-hidden bg-gray-50">
      <ResumeBuilderClient resumeId={dbResume.id} initialData={dbResume} />
    </div>
  );
}
