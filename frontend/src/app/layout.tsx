import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Honlue Petnou Frederic Armel | Senior Frontend Engineer",
  description:
    "Honlue Petnou Frederic Armel - Senior Frontend Engineer & QA — Product-Oriented. Designing, testing, and shipping reliable digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen overflow-x-hidden antialiased selection:bg-neon-blue/30 selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {/* Background Blobs */}
          <div className="fixed top-[-20%] left-[-10%] h-[50%] bg-blue-900/10 bg-blob animate-blob w-full"/>
          <div className="fixed bottom-[-20%] right-[-10%] h-[50%] bg-blue-800/10 bg-blob animate-blob animation-delay-2000 w-full" />

          <Navbar />
          <main className="w-full pt-20 min-h-[calc(100vh-100px)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
