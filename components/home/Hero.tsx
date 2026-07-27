"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background */}

      <Image
        src="/backgrounds/jungle-background.webp"
        alt="Rainforest"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}

      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="text-center px-6 max-w-4xl">

          <Image
            src="/logos/logo.png"
            alt="Berrys Exotics"
            width={250}
            height={250}
            className="mx-auto mb-8"
          />

          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Premium Crested &
            <br />
            Leachianus Geckos
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            Ethical breeding.
            Incredible genetics.
            Healthy animals raised with passion.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/collection"
              className="rounded-full bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-500 transition"
            >
              View Available Geckos
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white px-8 py-4 text-white hover:bg-white hover:text-black transition"
            >
              Learn More
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}