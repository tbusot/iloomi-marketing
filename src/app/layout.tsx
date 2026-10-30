import type { Metadata } from "next";
import { Playfair_Display, Inter, Source_Serif_4 } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ui";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iloomi - Keep the details before they fade",
  description: "Some moments only happen once. Iloomi helps you get the details down just by talking, and turns them into a story your family keeps forever.",
  keywords: ["life story", "family stories", "memoir", "family history", "legacy", "storytelling", "voice interview", "biography"],
  authors: [{ name: "Iloomi" }],
  openGraph: {
    title: "Iloomi - Keep the details before they fade",
    description: "Just talk. Iloomi asks the questions that bring the details back, then writes your story for the people you love.",
    type: "website",
    locale: "en_US",
    siteName: "Iloomi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iloomi - Keep the details before they fade",
    description: "Just talk. Iloomi asks the questions that bring the details back, then writes your story for the people you love.",
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
        className={`${playfair.variable} ${sourceSerif.variable} ${inter.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
