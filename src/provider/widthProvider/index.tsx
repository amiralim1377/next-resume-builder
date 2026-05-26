"use client";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type userAgentType = "ios" | "android" | "else";

interface InitialValueProps {
  isMobileClient: boolean;
  userAgent: userAgentType;
  width: number;
}

type SizeProviderProps = {
  children: ReactNode;
};

const initialValue: InitialValueProps = {
  isMobileClient: false,
  userAgent: "else",
  width: 0,
};

const getDeviceType = () => {
  if (typeof window === "undefined") return "else"; // SSR safety

  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "else";
};

const SizeContext = createContext(initialValue);

export const SizeProvider = ({ children }: SizeProviderProps) => {
  const { width, height } = useWindowSize();
  const [userAgent] = useState<userAgentType>(getDeviceType);
  const isMobileClient = width > 0 && width <= 768;

  useEffect(() => {
    const handleResize = () => {
      const vh = height * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  const value = useMemo(
    () => ({
      isMobileClient,
      width,
      height,
      userAgent,
    }),
    [isMobileClient, width, userAgent, height],
  );
  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
};

export const useSize = () => useContext(SizeContext);
