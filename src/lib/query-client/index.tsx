import {
  QueryClient,
  QueryCache,
  MutationCache,
  DefaultError,
} from "@tanstack/react-query";

export interface ApiError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof Error &&
    ("status" in error || "statusCode" in error || "code" in error)
  );
}

const handleGlobalError = (error: DefaultError) => {
  if (isApiError(error)) {
    console.error(
      `[Global Error ${error.status || error.code}]:`,
      error.message,
    );
  } else {
    console.error("[Global Non-API Error]:", error.message);
  }
};

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: (failureCount: number, error: DefaultError): boolean => {
        if (isApiError(error)) {
          const status = error.status || error.statusCode;
          if (status && status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 2;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => handleGlobalError(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => handleGlobalError(error),
  }),
};

export const createQueryClient = () => new QueryClient(queryClientConfig);
