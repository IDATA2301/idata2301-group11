import { createContext } from "react";
import type { AuthUser } from "../types/User";

export type AuthContextType = {
  authUser: AuthUser | null;
  signIn: (user: AuthUser) => void;
  updateAuthUser: (user: AuthUser) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
