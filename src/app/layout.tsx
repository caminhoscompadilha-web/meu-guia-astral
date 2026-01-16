import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal Meu Guia Astral",
  description: "Dossiê de Autoconhecimento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="font-serif">{children}</body>
    </html>
  );
}
