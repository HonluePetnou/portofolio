import { apiClient } from "@/lib/api-client";
import type {
  Testimonial,
  TestimonialCreate,
  TestimonialUpdate,
} from "@/lib/types";

export const testimonialsService = {
  getAll: () => apiClient<Testimonial[]>("/testimonials/me"),
  create: (data: TestimonialCreate) =>
    apiClient<Testimonial>("/testimonials", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: TestimonialUpdate) =>
    apiClient<Testimonial>(`/testimonials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiClient<{ ok: boolean }>(`/testimonials/${id}`, { method: "DELETE" }),
};

