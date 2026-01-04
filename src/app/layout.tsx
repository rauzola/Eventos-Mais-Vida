import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthHashHandler from "@/components/auth/auth-hash-handler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventos Mais Vida",
  description: "Sistema de Gestão de Eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F3F4F6]`}>
        <AuthHashHandler />
        {children}
      </body>
    </html>
  );
}
