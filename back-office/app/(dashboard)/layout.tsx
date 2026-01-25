import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { FloatingAI } from "@/components/layout/floating-ai";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 pt-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <FloatingAI />
      </div>
    </div>
  );
}
