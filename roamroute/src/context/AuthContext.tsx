import { useState, type ReactNode } from "react";
import type { AuthUser } from "../types/User";
import { AuthContext } from "./auth-context";

/*
 * AuthContext provides authentication state and functions to manage user login/logout.
 * It uses localStorage to persist the authenticated user across page reloads.
 * The context includes:
*/

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  });

  function signIn(user: AuthUser) {
    localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);
  }

  function updateAuthUser(user: AuthUser) {
    localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);
  }

  function signOut() {
    localStorage.removeItem("authUser");
    localStorage.removeItem("auth");
    setAuthUser(null);
  }

  return (
    <AuthContext.Provider value={{ authUser, signIn, updateAuthUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
