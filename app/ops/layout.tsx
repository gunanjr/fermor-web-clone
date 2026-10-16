import type { Metadata } from "next";
import { Sora, JetBrains_Mono, DM_Sans, Michroma, Cormorant_Garamond } from "next/font/google";
import "./kanso.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// DM Sans: referenced as var(--font-dm-sans) in OpsWorkspace.tsx already, but was
// never actually loaded here — fixing that gap alongside adding the two fonts the
// login page needs (Michroma for the wordmark only, Cormorant Garamond for the
// light-plate display heading only — see kanso-package/README.md's token list).
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanso — AI CMO Workspace",
  description: "Internal marketing operations workspace for Fermor.",
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sora.variable} ${jetbrainsMono.variable} ${dmSans.variable} ${michroma.variable} ${cormorantGaramond.variable}`}>
      {children}
    </div>
  );
}
