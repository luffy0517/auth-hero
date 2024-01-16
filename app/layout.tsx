import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthHero | Autenticação com Segurança Total",
  description:
    "Descubra o AuthHero, sua solução abrangente para autenticação. Desfrute de um sistema de login seguro que oferece autenticação de credenciais, integração OAuth e autenticação de dois fatores. Simplifique a experiência do usuário enquanto mantém a máxima segurança. Experimente o AuthHero hoje!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="pt-BR">
        <body className={montserrat.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
