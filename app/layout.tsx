import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/sidebar";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Stock Manager",
  description: "Stock Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased flex`}>
        <div className="flex fixed h-screen w-screen overflow-x-auto gap-8">
          <Sidebar />
          {children}
        </div>
        <Toaster
          toastOptions={{
            className: "bg-primary text-white",
          }}
        />
      </body>
    </html>
  );
}
