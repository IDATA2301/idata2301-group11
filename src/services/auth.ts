import type { AuthUser } from "../types/User";
import { apiFetch } from "./apiFetch";

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
  fullName: string;
  email: string;
  password: string;
  address?: string;
  country?: string;
};

type UpdateUsernameRequest = {
  id: number;
  userName: string;
};

type ForgotPasswordRequest = {
  email: string;
};

type ResetPasswordRequest = {
  token: string;
  password: string;
};

export async function login({ email, password }: LoginRequest): Promise<AuthUser> {
  const response = await apiFetch(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuth: true,
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
  localStorage.setItem("token", data.token);
  return data;
}

export async function register({
  fullName,
  email,
  password,
  address,
  country,
}: RegisterRequest): Promise<AuthUser> {
  const response = await apiFetch(`/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      fullName,
      email,
      password,
      address,
      country,
    }),
    skipAuth: true,
  });

  if (response.status === 400) {
    throw new Error("Please fill in name, email, and password.");
  }

  if (response.status === 409) {
    throw new Error("An account with this email already exists.");
  }

  if (!response.ok) {
    throw new Error("Signup failed. Please try again.");
  }

  const data: AuthUser = await response.json();
  return data;
}

export async function updateUsername({ id, userName }: UpdateUsernameRequest): Promise<AuthUser> {
  const response = await apiFetch(`/auth/profile/${id}/username`, {
    method: "PUT",
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

export async function requestPasswordReset({ email }: ForgotPasswordRequest): Promise<void> {
  const response = await apiFetch(`/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  if (response.status === 400) {
    throw new Error("Please enter a valid email address.");
  }

  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    throw new Error("Could not request a password reset. Please try again.");
  }
}

export async function resetPassword({ token, password }: ResetPasswordRequest): Promise<void> {
  const response = await apiFetch(`/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });

  if (response.status === 400) {
    throw new Error("Please provide a valid reset token and a new password.");
  }

  if (response.status === 404) {
    throw new Error("Reset token is invalid or has expired.");
  }

  if (!response.ok) {
    throw new Error("Could not reset password. Please try again.");
  }
}
