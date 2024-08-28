import { MutationFunction } from "@tanstack/react-query";
import { createContext } from "react";

export type QueryContextType = {
  mutationFn: MutationFunction<any, { path: string; method: string; body: any }>;
  onError: (error: any) => void;
};

export const QueryContext = createContext<QueryContextType>({
  mutationFn: () => Promise.resolve(),
  onError: () => {},
});