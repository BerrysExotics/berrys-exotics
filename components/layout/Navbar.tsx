"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/collection", label: "Available" },
    { href: "/breeders", label: "Breeders" },
    { href: "/about", label: "About" },
    { href: "/policy", label: "Policy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-500/20 bg-neutral-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="transition hover:scale-[1.02]"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logos/berrys-exotics-logo.png"
            alt="Berrys_Exotics"
            width={160}
            height={160}
            priority
            className="h-20 w-auto rounded-xl"
          />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wider md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-700 md:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (
        <nav className="border-t border-neutral-800 bg-neutral-950 md:hidden">
          <div className="flex flex-col px-6 py-4">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-semibold uppercase tracking-wide transition hover:bg-neutral-800 hover:text-emerald-400"
              >
                {link.label}
              </Link>
            ))}

          </div>
        </nav>
      )}
    </header>
  );
}