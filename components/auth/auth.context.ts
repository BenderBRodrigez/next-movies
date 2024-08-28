import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  login: (token: string, rememberMe?: boolean) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});
