import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";
import { SidebarDemo } from "./_components/sidebar";

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
      <body className={`${inter.className} antialiased`}>
        <SidebarDemo>{children}</SidebarDemo>
        <Toaster
          toastOptions={{
            className: "bg-primary text-white",
          }}
        />
      </body>
    </html>
  );
}
