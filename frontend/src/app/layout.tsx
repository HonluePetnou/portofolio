import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Frédéric Armel Petnou | Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer & QA — Product-Oriented. Designing, testing, and shipping reliable digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen antialiased selection:bg-neon-blue/30 selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {/* Background Blobs */}
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 bg-blob animate-blob" />
          <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-800/10 bg-blob animate-blob animation-delay-2000" />

          <Navbar />
          <main className="container mx-auto px-4 pt-20 min-h-[calc(100vh-100px)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
