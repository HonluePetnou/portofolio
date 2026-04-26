import { apiClient } from "@/lib/api-client";
import type { Project, ProjectCreate, ProjectUpdate } from "@/lib/types";

export const projectsService = {
  getAll: () => apiClient<Project[]>("/projects/me"),
  getBySlug: (slug: string) => apiClient<Project>(`/projects/slug/${slug}`),
  create: (data: ProjectCreate) =>
    apiClient<Project>("/projects", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: ProjectUpdate) =>
    apiClient<Project>(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => apiClient<{ ok: boolean }>(`/projects/${id}`, { method: "DELETE" }),
  adminCreate: (_id: string, data: ProjectCreate) =>
    apiClient<Project>("/projects", { method: "POST", body: JSON.stringify(data) }),
  adminDelete: (id: string) =>
    apiClient<{ ok: boolean }>(`/projects/admin/${id}`, { method: "DELETE" }),
};

