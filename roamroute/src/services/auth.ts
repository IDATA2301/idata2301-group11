import type { AuthUser } from "../types/User";

/* ============================
 * Authentication Service
 * ============================
 *
 * This module provides functions for authentication-related API requests.
 * It communicates with the backend API and returns typed `AuthUser` data.
 *
 * Exposed functions:
 * - `login`: Authenticate using email and password.
 * - `register`: Create a new account.
 * - `updateUsername`: Update an existing user's username.
 *
 * The service also defines the API base URL using environment variables for flexibility across environments.
 */

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
  address?: string;
  country?: string;
};

type UpdateUsernameRequest = {
  id: number;
  userName: string;
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

  const auth = btoa(email + ":" + password);
  localStorage.setItem("auth", auth);
  return data;
}

export async function register({
  userName,
  email,
  password,
  address,
  country,
}: RegisterRequest): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      email,
      password,
      address,
      country,
    }),
  });

  if (response.status === 400) {
    throw new Error("Please fill in name, email, and password.");
  }

  if (response.status === 409) {
    throw new Error("Email or username is already in use.");
  }

  if (!response.ok) {
    throw new Error("Signup failed. Please try again.");
  }

  const data: AuthUser = await response.json();
  return data;
}

export async function updateUsername({ id, userName }: UpdateUsernameRequest): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile/${id}/username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName }),
  });

  if (response.status === 400) {
    throw new Error("Username is required.");
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error("You are not authorized to update this profile.");
  }

  if (response.status === 404) {
    throw new Error("User not found.");
  }

  if (response.status === 409) {
    throw new Error("Username is already taken.");
  }

  if (!response.ok) {
    throw new Error("Could not update profile. Please try again.");
  }

  const data: AuthUser = await response.json();
  return data;
}
