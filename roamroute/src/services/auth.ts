import type { AuthUser } from "../types/User";

/* ============================
 * Authentication Service
 * ============================
 *
 * This module provides functions to handle user authentication, including login and logout.
 * It interacts with the backend API to authenticate users and manages the authenticated user state.
 *
 * The main function is:
 * - login: Authenticates a user with email and password, returning an AuthUser object on success.
 *
 * The service also defines the API base URL using environment variables for flexibility across environments.
 */

type LoginRequest = {
  email: string;
  password: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login({ email, password }: LoginRequest): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 400) {
    throw new Error("Please fill in all fields.");
  }

  if (response.status === 401) {
    throw new Error("Invalid email or password.");
  }

  if (!response.ok) {
    throw new Error("Login failed. Please try again.");
  }

  const data: AuthUser = await response.json();
  return data;
}
