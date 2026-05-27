"use client";
import { useSize } from "@/provider/widthProvider";

interface ConditionalRendererProps {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}

export const ConditionalRenderer = ({
  desktop,
  mobile,
}: ConditionalRendererProps) => {
  const { width, isMobileClient, userAgent } = useSize();
  // console.log(width);
  // console.log(isMobileClient);
  // console.log(userAgent);

  const isMobileSSR = /Android|iPhone|iPad|iPod/i.test(userAgent);

  const activeIsMobile = width > 0 ? isMobileClient : isMobileSSR;

  return <>{activeIsMobile ? mobile : desktop}</>;
};
