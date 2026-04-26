const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? (localStorage.getItem("access_token") || localStorage.getItem("auth_token")) : null;
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  }

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: `HTTP ${response.status}: ${response.statusText}` };
    }
    const errorMessage = errorData.detail || errorData.message || "Request failed";
    throw new Error(errorMessage);
  }

  return response.json();
}
