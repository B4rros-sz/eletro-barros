import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProvedorCarrinho } from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EletroBarros | Materiais Elétricos",
  description: "EletroBarros: Qualidade em materiais elétricos e serviços residenciais. Fios, disjuntores, iluminação e ferramentas com o melhor preço.",
  keywords: "materiais elétricos, disjuntor, cabos elétricos, elétrica, tomada, EletroBarros, orçamento elétrico",
  openGraph: {
    title: "EletroBarros | Materiais Elétricos",
    description: "Sua loja completa de materiais elétricos.",
    type: "website",
    locale: "pt_BR",
    siteName: "EletroBarros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvedorCarrinho>
          {children}
        </ProvedorCarrinho>
      </body>
    </html>
  );
}
