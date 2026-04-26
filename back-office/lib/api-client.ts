const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiClient<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    document.cookie = "auth_token=; path=/; max-age=0";
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    let message = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const err = (await response.json()) as { detail?: string; message?: string };
      message = err.detail || err.message || message;
    } catch {
      // ignore parsing failures
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

