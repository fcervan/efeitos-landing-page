import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Grain from "@/components/layout/Grain";
import { EFFECTS } from "@/lib/effects";

/**
 * Poppins self-hosted pelo next/font: mesma fonte do Google Fonts com display swap,
 * porém sem request externo, sem preconnect e sem CLS (o fallback já nasce métrico).
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Efeitos Landing Page — laboratório de efeitos de interface",
    template: "%s — Efeitos Landing Page",
  },
  description:
    "Home curada, índice com custo declarado e uma página isolada por efeito, com ficha técnica e prompt copiável. 29 efeitos de scroll, 3D, estética e micro-interação.",
  keywords: [
    "motion design",
    "framer motion",
    "gsap",
    "lenis",
    "scrollytelling",
    "next.js",
    "laboratório de efeitos",
  ],
  applicationName: "Efeitos Landing Page",
  authors: [{ name: "Efeitos Landing Page" }],
  openGraph: {
    title: "Efeitos Landing Page — laboratório de efeitos de interface",
    description: `${EFFECTS.length} efeitos com demo isolada, custo medido e prompt pronto para colar em qualquer LLM.`,
    locale: "pt_BR",
    type: "website",
    siteName: "Efeitos Landing Page",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF5A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <LenisProvider>
          <Navbar />
          <div id="conteudo">{children}</div>
          <Footer />
        </LenisProvider>
        <Grain />
      </body>
    </html>
  );
}
