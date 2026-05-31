import { PanelSidebar } from "@/components/layout/panelSidebar";
import { ReactNode } from "react";

type PanelLayoutProps = {
  children: ReactNode;
};

export default function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <div className="grid h-auto w-full grid-cols-[250px_1fr] gap-9">
      <PanelSidebar />
      <main>{children}</main>
    </div>
  );
}
