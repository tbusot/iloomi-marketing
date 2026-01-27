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
  title: "ILOOMI - The Collaborative Biographer",
  description: "Stories told together. Memories cherished forever. Capture and preserve your life story with the help of AI and your loved ones. Create a lasting legacy for generations to come.",
  keywords: ["biography", "memoir", "life story", "family history", "legacy", "storytelling", "collaborative writing", "AI biographer"],
  authors: [{ name: "ILOOMI" }],
  openGraph: {
    title: "ILOOMI - The Collaborative Biographer",
    description: "Stories told together. Memories cherished forever. Capture and preserve your life story with the help of AI and your loved ones.",
    type: "website",
    locale: "en_US",
    siteName: "ILOOMI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILOOMI - The Collaborative Biographer",
    description: "Stories told together. Memories cherished forever. Capture and preserve your life story with the help of AI and your loved ones.",
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
