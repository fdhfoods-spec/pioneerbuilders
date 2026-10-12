import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageMotion } from "@/components/motion/PageMotion";
import { company } from "@/content/company";
import { siteUrl } from "@/lib/site";
import { organizationJsonLd } from "@/lib/structured-data";

/* Two families only: Archivo (width axis → expanded, architectural display) + Instrument Sans (body). */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Civil Construction Since ${company.established}`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    siteName: company.name,
    type: "website",
    locale: "en_IN",
    title: `${company.name} | Civil Construction Since ${company.established}`,
    description: company.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111311" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
  ],
  colorScheme: "dark light",
};

/**
 * Runs before first paint:
 * 1. Initializes theme (dark by default or saved preference/system light).
 * 2. Initializes motion gate (marks document `motion-ok` if reduced motion is disabled).
 */
const headInitScript = `try{var t=localStorage.getItem('pb-theme'),m=window.matchMedia('(prefers-color-scheme: light)').matches;if(t==='light'||(!t&&m)){document.documentElement.classList.add('light');document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark')}}catch(e){}try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ok')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {/* Placed after children so its effect runs after pages have mounted. */}
        <PageMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
