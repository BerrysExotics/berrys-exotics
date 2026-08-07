import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/40 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <Image
              src="/logos/berrys-exotics-logo.png"
              alt="Berrys_Exotics"
              width={180}
              height={180}
              className="mb-6 h-24 w-auto"
            />

            <h3 className="text-2xl font-black text-white">
              Berrys_Exotics
            </h3>

            <p className="mt-3 max-w-sm text-neutral-400">
              Premium captive-bred Crested and Leachianus geckos.
              Dedicated to quality genetics, ethical breeding,
              and exceptional customer support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-xl font-bold text-white">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">

              <Link
                href="/"
                className="text-neutral-400 transition hover:text-emerald-400"
              >
                Home
              </Link>

              <Link
                href="/collection"
                className="text-neutral-400 transition hover:text-emerald-400"
              >
                Available Geckos
              </Link>

              <Link
                href="/about"
                className="text-neutral-400 transition hover:text-emerald-400"
              >
                About
              </Link>

              <Link
                href="/policy"
                className="text-neutral-400 transition hover:text-emerald-400"
              >
                Store Policy
              </Link>

              <Link
                href="/contact"
                className="text-neutral-400 transition hover:text-emerald-400"
              >
                Contact
              </Link>

            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-5 text-xl font-bold text-white">
              Follow Berrys_Exotics
            </h4>

            <div className="flex flex-col gap-3">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition hover:text-pink-400"
              >
                📸 Instagram
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition hover:text-white"
              >
                🎵 TikTok
              </a>

              <a
                href="https://morphmarket.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition hover:text-emerald-400"
              >
                🦎 MorphMarket
              </a>

            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-neutral-800 pt-8 text-center">

          <p className="text-neutral-500">
            Quality Genetics • Ethical Breeding • Exceptional Support
          </p>

        </div>

      </div>
    </footer>
  );
}