import type { AuthUser } from "../types/User";

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

export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = readToken();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    localStorage.removeItem("authUser");
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
  }

  return response;
}
