import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sell Your Estate Jewelry | ROC Diamonds — Trusted Buyers",
  description:
    "Turn your inherited jewelry, diamonds, watches, and estate pieces into immediate cash. Expert evaluations, same-day offers, complete discretion. Book your free consultation.",
  keywords: "sell estate jewelry, sell diamond ring, cash for jewelry, estate jewelry buyers, sell Rolex, sell Cartier, inherited jewelry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
