"use client";

import { FaInstagram, FaTiktok } from "react-icons/fa";

interface Props {
  instagram?: string | null;
  tiktok?: string | null;
  morphmarket?: string | null;
}

export default function SocialLinks({
  instagram,
  tiktok,
  morphmarket,
}: Props) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 px-5 py-3 font-semibold text-white transition hover:scale-105"
        >
          <FaInstagram className="text-xl" />
          <span>Instagram</span>
        </a>
      )}

      {tiktok && (
        <a
          href={tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 font-semibold text-white transition hover:bg-neutral-800"
        >
          <FaTiktok className="text-xl" />
          <span>TikTok</span>
        </a>
      )}

      {morphmarket && (
        <a
          href={morphmarket}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-emerald-500 px-5 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-black"
        >
          🦎 MorphMarket
        </a>
      )}

    </div>
  );
}