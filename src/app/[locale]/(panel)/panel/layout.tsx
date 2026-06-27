import { PanelSidebar } from "@/components/layout/panelSidebar";
import { ReactNode } from "react";

type PanelLayoutProps = {
  children: ReactNode;
};

export default function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <div className="grid w-full grid-cols-[200px_1fr]">
      <div className="sticky top-4 self-start">
        <PanelSidebar />
      </div>

      <main className=" ">{children}</main>
    </div>
  );
}
