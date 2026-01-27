import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ui";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iloomi - Fertility Tracking Made Simple",
  description: "Track your fertility journey with confidence using Iloomi's intelligent cycle tracking and personalized insights.",
  keywords: ["fertility", "cycle tracking", "ovulation", "period tracker", "women's health"],
  authors: [{ name: "Iloomi" }],
  openGraph: {
    title: "Iloomi - Fertility Tracking Made Simple",
    description: "Track your fertility journey with confidence using Iloomi's intelligent cycle tracking and personalized insights.",
    type: "website",
    locale: "en_US",
    siteName: "Iloomi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iloomi - Fertility Tracking Made Simple",
    description: "Track your fertility journey with confidence using Iloomi's intelligent cycle tracking and personalized insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
