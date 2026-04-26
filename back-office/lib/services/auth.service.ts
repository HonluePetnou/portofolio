import { apiClient } from "@/lib/api-client";
import type { AuthResponse, Profile } from "@/lib/types";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const response = await fetch(`${base}/auth/login`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(err.detail || "Login failed");
  }

  return (await response.json()) as AuthResponse;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("username");
  document.cookie = "auth_token=; path=/; max-age=0";
}

export async function me(): Promise<Profile> {
  return apiClient<Profile>("/auth/me");
}

