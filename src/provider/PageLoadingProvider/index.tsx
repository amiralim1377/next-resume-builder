"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PageLoadingProviderProps {
  children: ReactNode;
}

interface InitialValueProps {
  isPageLoading: boolean;
  setIsPageLoading: Dispatch<SetStateAction<boolean>>;
}

const initialValue: InitialValueProps = {
  isPageLoading: false,
  setIsPageLoading: () => {},
};

const PageLoadingContext = createContext(initialValue);

export const PageLoadingProvider = ({ children }: PageLoadingProviderProps) => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSearchParam = searchParams.get("active");

  const [prevPathname, setPrevPathname] = useState<string>(pathname);
  const [prevSearchParam, setPrevSearchParam] = useState<string | null>(
    activeSearchParam,
  );

  if (pathname !== prevPathname || activeSearchParam !== prevSearchParam) {
    setPrevPathname(pathname);
    setPrevSearchParam(activeSearchParam);
    if (isPageLoading) {
      setIsPageLoading(false);
    }
  }

  const value = { isPageLoading, setIsPageLoading };

  return (
    <PageLoadingContext.Provider value={value}>
      {children}
    </PageLoadingContext.Provider>
  );
};

export const usePageLoading = () => {
  const { isPageLoading, setIsPageLoading } = useContext(PageLoadingContext);
  return { isPageLoading, setIsPageLoading };
};
