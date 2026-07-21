import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "KALERO — Premium Home Air Filters | MERV 8, 11, 13 HVAC Filters Delivered",
    template: "%s | KALERO Air Filters",
  },
  description:
    "Shop premium residential air filters in every standard HVAC size (16x25x1, 20x20x1, 20x25x1, and more). MERV 8, MERV 11, and MERV 13 filters for pet dander, allergies, smoke, dust, and odors — delivered on your schedule with free shipping.",
  keywords: [
    "air filters",
    "home air filters",
    "HVAC air filter",
    "furnace filter",
    "MERV 8 filter",
    "MERV 11 filter",
    "MERV 13 filter",
    "20x25x1 air filter",
    "16x25x1 air filter",
    "20x20x1 air filter",
    "14x20x1 air filter",
    "16x20x1 air filter",
    "20x30x1 air filter",
    "pet dander air filter",
    "allergy air filter",
    "smoke air filter",
    "wildfire air filter",
    "pollen air filter",
    "carbon activated filter",
    "air filter subscription",
    "air filter delivery",
    "HVAC filter for pets",
    "high MERV filter",
    "residential air filter",
    "premium air filter",
    "KALERO",
  ],
  metadataBase: new URL("https://kalero.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KALERO — Premium Home Air Filters, Delivered",
    description:
      "MERV 8, 11, and 13 air filters in every standard size. Made for real home concerns — pets, allergies, smoke, dust. Free shipping. Skip or cancel anytime.",
    type: "website",
    siteName: "KALERO",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KALERO — Premium Home Air Filters, Delivered",
    description:
      "MERV 8, 11, and 13 air filters for pets, allergies, smoke, and dust. Every standard size. Delivered on your schedule.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Home Improvement",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KALERO",
  url: "https://kalero.com",
  logo: "https://kalero.com/kalero-logo.png",
  description:
    "Premium residential air filters in MERV 8, 11, and 13. Made for pets, allergies, smoke, dust, and odors. Delivered on subscription with free shipping.",
  sameAs: [] as string[],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KALERO",
  url: "https://kalero.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kalero.com/shop?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-canvas text-charcoal">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
