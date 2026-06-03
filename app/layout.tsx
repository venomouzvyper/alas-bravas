import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { RestaurantJsonLd } from "@/components/layout/RestaurantJsonLd";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://www.alasbravashn.com";
const OG_IMAGE = "/galeria/restaurante-noche.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Alas Bravas — Las Mejores Alitas del Sur",
    template: "%s | Alas Bravas",
  },
  description:
    "Alitas crujientes, salsas explosivas y sabores que no olvidarás. Visítanos en La Cabaña, San Lorenzo. Abierto 1 PM – 11 PM.",
  openGraph: {
    type: "website",
    locale: "es_HN",
    url: BASE_URL,
    siteName: "Alas Bravas",
    title: "Alas Bravas — Las Mejores Alitas del Sur",
    description:
      "Alitas crujientes, salsas explosivas y sabores que no olvidarás. La Cabaña, San Lorenzo.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Alas Bravas — Alitas crujientes y salsas explosivas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alas Bravas — Las Mejores Alitas del Sur",
    description: "Alitas crujientes, salsas explosivas. La Cabaña, San Lorenzo.",
    images: [OG_IMAGE],
  },
  keywords: ["alitas", "alas bravas", "restaurante", "San Lorenzo", "Valle", "sur de Honduras", "alitas de pollo", "La Cabaña"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <GoogleAnalytics />
        <RestaurantJsonLd />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
