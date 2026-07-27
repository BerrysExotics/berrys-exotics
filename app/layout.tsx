import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berrys_Exotics",
  description: "Premium Captive-Bred New Caledonian Geckos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}