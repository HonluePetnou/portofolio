import { apiClient } from "@/lib/api-client";
import type { Contact, ContactUpdate } from "@/lib/types";

export const contactService = {
  getAll: () => apiClient<Contact[]>("/admin/contact"),
  getById: (id: string) => apiClient<Contact>(`/admin/contact/${id}`),
  update: (id: string, data: ContactUpdate) =>
    apiClient<Contact>(`/admin/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiClient<{ ok: boolean }>(`/admin/contact/${id}`, { method: "DELETE" }),
};

