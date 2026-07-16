import { notFound } from "next/navigation";
import { ResumeBuilderClient } from "./_components/ResumeBuilderClient";
import { ResumeService } from "@/modules/resume-builder/application/services/resume.service";

interface BuilderPageProps {
  params: Promise<{
    resumeId: string;
    locale: string;
  }>;
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const resolvedParams = await params;
  const { resumeId: shortId } = resolvedParams;

  const resumeService = new ResumeService();
  const dbResume = await resumeService.getResumeByShortId(shortId);

  if (!dbResume) {
    notFound();
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-gray-50">
      <ResumeBuilderClient resumeId={dbResume.id} initialData={dbResume} />
    </div>
  );
}
