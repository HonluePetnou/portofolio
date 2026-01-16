import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6",
        !hoverEffect && "hover:shadow-none hover:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
