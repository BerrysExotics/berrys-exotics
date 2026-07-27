"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logos/logo.png"
            alt="Berrys Exotics"
            width={55}
            height={55}
            priority
          />

          <div>
            <h1 className="text-white font-bold text-xl">
              Berrys Exotics
            </h1>

            <p className="text-green-400 text-sm">
              Premium Geckos
            </p>
          </div>

        </Link>

        <nav className="hidden md:flex items-center gap-8">

          <Link href="/">
            Home
          </Link>

          <Link href="/collection">
            Collection
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>

        </nav>

        <Link
          href="/collection"
          className="rounded-full bg-green-600 hover:bg-green-500 px-5 py-2 font-semibold transition"
        >
          View Geckos
        </Link>

      </div>
    </header>
  );
}