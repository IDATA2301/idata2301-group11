import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthUser } from "../types/User";

/*
 * AuthContext provides authentication state and functions to manage user login/logout.
 * It uses localStorage to persist the authenticated user across page reloads.
 * The context includes:
*/

type AuthContextType = {
  authUser: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

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

  function signOut() {
    localStorage.removeItem("authUser");
    setAuthUser(null);
  }

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
