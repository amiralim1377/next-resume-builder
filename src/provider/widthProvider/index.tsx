"use client";
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
  const [width, setWidth] = useState<number>(0);
  const [userAgent] = useState<userAgentType>(getDeviceType);
  const [isMobileClient, setIsMobileClient] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const vh = window.innerHeight * 0.01;

      setWidth(currentWidth);

      setIsMobileClient(currentWidth > 0 && currentWidth <= 768);

      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = useMemo(
    () => ({
      isMobileClient,
      width,
      userAgent,
    }),
    [isMobileClient, width, userAgent],
  );
  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
};

export const useSize = () => useContext(SizeContext);
