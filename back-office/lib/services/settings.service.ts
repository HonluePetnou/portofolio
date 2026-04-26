import { apiClient } from "@/lib/api-client";
import type { Settings, SettingsUpdate } from "@/lib/types";

export const settingsService = {
  get: () => apiClient<Settings>("/settings"),
  update: (data: SettingsUpdate) =>
    apiClient<Settings>("/settings", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

