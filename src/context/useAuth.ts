import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./auth-context";

/** Hook for reading authentication state from `AuthProvider`. */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
