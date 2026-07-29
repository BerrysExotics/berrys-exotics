"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-green-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wider text-white hover:text-green-400 transition"
        >
          BERRYS
          <span className="text-green-500"> EXOTICS</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-lg">

          <Link
            href="/"
            className="text-white hover:text-green-400 transition"
          >
            Home
          </Link>

          <Link
            href="/collection"
            className="text-white hover:text-green-400 transition"
          >
            Collection
          </Link>

          <Link
            href="/about"
            className="text-white hover:text-green-400 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-white hover:text-green-400 transition"
          >
            Contact
          </Link>

        </nav>
      </div>
    </header>
  );
}