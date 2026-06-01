import { ReactNode } from "react";

type NewResumePageLayoutProps = {
  children: ReactNode;
};

export default function NewResumePageLayout({
  children,
}: NewResumePageLayoutProps) {
  return (
    <div className="grid grid-cols-1 grid-rows-2 justify-items-center">
      <section>FormStepper </section>
      <main>{children}</main>
    </div>
  );
}
