import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Berrys Exotics",
  description: "Premium Captive-Bred New Caledonian Geckos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white">
        <Navbar />

        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}