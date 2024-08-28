"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { PropsWithChildren, useCallback, useMemo, useContext } from "react";
import { AuthContext } from "../auth/auth.context";
import { QueryContext } from "./query.context";
import { toast } from "react-toastify";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const { token } = useContext(AuthContext);

  const fetchWithAuth = useCallback(
    (url: string, options: RequestInit) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token]
  );

  const mutationFn = useCallback(
    async ({
      path,
      method,
      body,
    }: {
      path: string;
      method: string;
      body: any;
    }) => {
      const response = await fetchWithAuth(`/api/${path}`, {
        method,
        body: body instanceof FormData ? body : JSON.stringify(body),
      });
      if (response.ok) {
        return await response.json();
      }
      const error = await response.text();
      throw new Error(error);
    },
    [fetchWithAuth]
  );

  const queryFn = useCallback(
    async ({ queryKey, pageParam, signal }: QueryFunctionContext) => {
      const [path, params] = queryKey;
      let urlSearchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          urlSearchParams.set(key, value);
        });
      }
      if (pageParam) {
        urlSearchParams.set("page", pageParam.toString());
      }
      const response = await fetchWithAuth(
        `/api/${path}?${urlSearchParams.toString()}`,
        { signal }
      );
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`Network error: status ${response.status}`);
    },
    [fetchWithAuth]
  );

  const onError = useCallback(
    async (error: any) => {
      const errorMessage = await JSON.parse(error.message);
      if (errorMessage.message) {
        toast.error(errorMessage.message);
      }
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((e) => {
          toast.error(e.message);
        });
      }
    },
    []
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn,
          },
        },
      }),
    [queryFn]
  );

  return (
    <QueryContext.Provider value={{ mutationFn, onError }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryContext.Provider>
  );
};
