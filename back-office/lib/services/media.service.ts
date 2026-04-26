import { apiClient } from "@/lib/api-client";

export const mediaService = {
  upload: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "general");
    return apiClient<{ url: string }>("/media/upload", {
      method: "POST",
      body: formData,
    });
  },
};

