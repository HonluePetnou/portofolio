"use client";

import { ProfileTestimonials } from "@/components/testimonials/ProfileTestimonials";

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Témoignages</h2>
          <p className="text-muted-foreground">
            Gérez vos retours clients et recommandations.
          </p>
        </div>
      </div>

      <div className="bg-card p-6 border rounded-lg">
        <ProfileTestimonials />
      </div>
    </div>
  );
}
