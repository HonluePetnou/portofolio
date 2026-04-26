"use client";

import { useCallback, useEffect, useState } from "react";
import type { Profile } from "@/lib/types";
import { login as loginService, logout as logoutService, me } from "@/lib/services/auth.service";

export function useAuth() {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const profile = await me();
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginService(email, password);
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("auth_token", res.access_token);
    document.cookie = `auth_token=${res.access_token}; path=/`;
    await refresh();
    return res;
  }, [refresh]);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}

