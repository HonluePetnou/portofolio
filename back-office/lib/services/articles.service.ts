import { apiClient } from "@/lib/api-client";
import type { Article, ArticleCreate, ArticleUpdate } from "@/lib/types";

export const articlesService = {
  getAll: () => apiClient<Article[]>("/articles"),
  getById: (id: string) => apiClient<Article>(`/articles/${id}`),
  create: (data: ArticleCreate) =>
    apiClient<Article>("/articles", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: ArticleUpdate) =>
    apiClient<Article>(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => apiClient<{ ok: boolean }>(`/articles/${id}`, { method: "DELETE" }),
  archive: (id: string, archived = true) =>
    apiClient<Article>(`/articles/${id}/archive?archived=${archived}`, {
      method: "PATCH",
    }),
};

