import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviscon Intelligence",
  description: "Central de marketing, atendimento, CRM e inteligência comercial da Serviscon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
