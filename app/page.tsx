import Image from "next/image";
import Link from "next/link";

import Stats from "@/components/home/Stats";
import FeaturedGeckos from "@/components/home/FeaturedGeckos";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <Image
          src="/backgrounds/jungle-background.webp"
          alt="Jungle"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <Image
            src="/logos/logo.png"
            alt="Berry's Exotics"
            width={220}
            height={220}
            className="mx-auto mb-8"
          />

          <h1 className="text-6xl md:text-8xl font-black tracking-widest text-white">
            BERRYS
          </h1>

          <h2 className="text-3xl md:text-5xl text-green-500 font-bold mb-6">
            EXOTICS
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
            Premium Captive-Bred New Caledonian Geckos
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/collection"
              className="bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-xl text-lg font-semibold"
            >
              View Collection
            </Link>

            <Link
              href="/about"
              className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-xl text-lg font-semibold"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Featured Geckos */}
      <FeaturedGeckos />

      {/* Why Choose Us */}
      <WhyChooseUs />
    </main>
  );
}