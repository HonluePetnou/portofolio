import { apiClient } from "@/lib/api-client";
import type { GeneratedContent, SocialGenerated } from "@/lib/types";

export const aiService = {
  generate: (prompt: string, type: string) =>
    apiClient<GeneratedContent>("/ai/generate", {
      method: "POST",
      body: JSON.stringify({ prompt, context_type: type }),
    }),
  generateSocial: (articleId: string) =>
    apiClient<SocialGenerated>(`/social/generate/${articleId}`, {
      method: "POST",
    }),
};

