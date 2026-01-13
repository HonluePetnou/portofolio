"use client";

import { GlassCard } from "@/components/ui/glass-card";

export function ProfileSummary() {
  return (
    <GlassCard className="mb-10 p-8 md:p-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Engineering Profile
      </h2>
      <div className="space-y-4 text-gray-300">
        <p>
          Aspiring Software Engineer currently pursuing an Engineering Degree at{" "}
          <strong>
            National Advanced School of Polytechnic of Douala (2022–2027)
          </strong>
          .
        </p>
        <p>
          My approach to engineering is deeply rooted in a{" "}
          <strong>product mindset</strong>. I don't just write code; I think
          about the end-user, the business value, and the long-term
          maintainability of the software I build.
        </p>
        <p>
          I believe that <strong>Quality Assurance</strong> is not a separate
          phase but a core feature of the product development lifecycle. By
          integrating testing strategies like BDD early on, I ensure that
          shipping is a confident, routine event rather than a stressful
          deadline.
        </p>
      </div>
    </GlassCard>
  );
}
