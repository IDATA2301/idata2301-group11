import type { AuthUser } from "../types/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Sends API requests with the stored auth token and shared error handling.
 */
function readToken(): string | null {
  const stored = localStorage.getItem("authUser");
  if (!stored) return null;
  try {
    const user = JSON.parse(stored) as AuthUser;
    return user.token ?? null;
  } catch {
    return null;
  }
}

function buildUrl(input: string): string {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }

  const normalizedPath = input.startsWith("/") ? input : `/${input}`;
  const base = API_BASE_URL.replace(/\/$/, "");
  return `${base}${normalizedPath}`;
}

export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = readToken();
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(input), { ...init, headers });

  if (response.status === 401) {
    localStorage.removeItem("authUser");
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }

    throw new Error("Unauthorized. Please log in again.");
  }

  if (response.status === 403) {
    throw new Error("You don't have permission to access this resource.");
  }

  return response;
}