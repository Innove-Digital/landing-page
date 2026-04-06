import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innove",
  url: "https://innovedigital.pro",
  logo: "https://innovedigital.pro/wp-content/uploads/2026/03/cropped-innove-logo-Photoroom-192x192.png",
  description:
    "Consultoria de automação e tecnologia empresarial que mapeia, projeta e implementa automações de processos para empresas brasileiras, usando n8n, Make, Zapier e desenvolvimento custom.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "Portuguese",
    url: "https://agenda.innovedigital.pro/gabriel-amaro/avaliacao-inicial-innove",
  },
  areaServed: "BR",
  knowsAbout: [
    "Automação de processos empresariais",
    "Integração de sistemas",
    "RPA",
    "n8n",
    "Make",
    "Zapier",
    "Inteligência Artificial aplicada a negócios",
  ],
};

export const metadata: Metadata = {
  title: "Innove | Automação e Tecnologia Empresarial",
  description:
    "A Innove mapeia, desenha e automatiza os processos da sua empresa — eliminando gargalos, retrabalho e desperdício com automações personalizadas usando n8n, Make, Zapier e desenvolvimento custom.",
  metadataBase: new URL("https://innovedigital.pro"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Innove | Automação Inteligente para Empresas",
    description:
      "Reduza em média 70% do retrabalho manual e triplique a velocidade dos seus processos operacionais. A Innove projeta e implementa automações sob medida para o seu negócio.",
    url: "https://innovedigital.pro",
    siteName: "Innove",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://innovedigital.pro/wp-content/uploads/2026/03/cropped-innove-logo-Photoroom-270x270.png",
        width: 270,
        height: 270,
        alt: "Innove — Automação e Tecnologia Empresarial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innove | Automação e Tecnologia Empresarial",
    description:
      "A Innove automatiza os processos da sua empresa com n8n, Make, Zapier e IA — reduzindo 70% do retrabalho.",
  },
  robots: { index: true, follow: true },
  keywords: [
    "automação de processos",
    "automação empresarial",
    "integração de sistemas",
    "n8n",
    "Make",
    "Zapier",
    "RPA",
    "tecnologia empresarial",
    "consultoria de automação",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
