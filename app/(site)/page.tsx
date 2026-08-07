import Image from "next/image";
import Link from "next/link";

import Stats from "@/components/home/Stats";
import FeaturedGeckos from "@/components/home/FeaturedGeckos";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import InstallAppButton from "@/components/ui/InstallAppButton";
import SocialLinks from "@/components/ui/SocialLinks";

import { getWebsiteSettings } from "@/lib/settings";

export default async function Home() {
  const settings = await getWebsiteSettings();

  return (
    <main className="-mt-28 md:-mt-32">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

        {/* Background */}
        <Image
          src="/backgrounds/jungle-background.webp"
          alt="Jungle Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 pt-28 pb-16 text-center md:px-6 md:pt-32">

          {/* Logo */}
          <Image
            src="/logos/berrys-exotics-logo.png"
            alt="Berry's Exotics"
            width={470}
            height={470}
            priority
            className="mb-6 h-auto w-44 drop-shadow-2xl sm:w-52 md:mb-8 md:w-[340px]"
          />

          {/* Eyebrow */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300 sm:text-sm">
            {settings.homepage_title}
          </p>

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl">
            {settings.homepage_subtitle}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8 md:mt-8 md:text-2xl">
            {settings.homepage_description}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:mt-12 md:max-w-none md:flex-row md:flex-wrap md:justify-center md:gap-6">

            <Link
              href="/collection"
              className="rounded-xl bg-emerald-600 px-8 py-4 text-center text-lg font-semibold transition hover:bg-emerald-700"
            >
              View Available Geckos
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-white px-8 py-4 text-center text-lg font-semibold transition hover:bg-white hover:text-black"
            >
              Learn More
            </Link>

            <InstallAppButton />

          </div>

          {/* Social Links */}
          <div className="mt-8 md:mt-10">
            <SocialLinks
              instagram={settings.instagram}
              tiktok={settings.tiktok}
              morphmarket={settings.morphmarket}
            />
          </div>

        </div>

      </section>

      <Stats />

      <FeaturedGeckos />

      <WhyChooseUs />
    </main>
  );
}