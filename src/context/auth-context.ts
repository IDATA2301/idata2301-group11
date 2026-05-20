import { createContext } from "react";
import type { AuthUser } from "../types/User";

/** Shape of the shared authentication context. */
export type AuthContextType = {
  authUser: AuthUser | null;
  signIn: (user: AuthUser) => void;
  updateAuthUser: (user: AuthUser) => void;
  signOut: () => void;

  favoriteCount: number;
  setFavoriteCount: (count: number) => void;
};

/** React context carrying authentication state and actions. */
export const AuthContext = createContext<AuthContextType | null>(null);
