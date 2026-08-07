"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  gecko: {
    id: string;
    name: string;
    morph: string;
    species: string;
    weight: number | null;
    availability: string;
    coverImage: string | null;
  };
}

export default function MobileInventoryCard({
  gecko,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-4 shadow-lg">

      <div className="flex gap-4">

        <div className="h-24 w-24 overflow-hidden rounded-xl bg-neutral-700 flex-shrink-0">

          {gecko.coverImage ? (
            <Image
              src={gecko.coverImage}
              alt={gecko.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl">
              🦎
            </div>
          )}

        </div>

        <div className="flex flex-1 flex-col justify-between">

          <div>

            <h2 className="text-xl font-black text-white">
              {gecko.name}
            </h2>

            <p className="text-green-400">
              {gecko.morph}
            </p>

            <p className="text-sm text-neutral-400">
              {gecko.species}
            </p>

            <p className="mt-1 text-sm text-neutral-300">
              ⚖ {gecko.weight ?? "-"} g
            </p>

            <p
              className={`mt-1 text-sm font-bold ${
                gecko.availability === "Available"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {gecko.availability}
            </p>

          </div>

          <div className="mt-4 flex justify-between">

            <Link
              href={`/Admin/inventory/${gecko.id}`}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white"
            >
              👁
            </Link>

            <Link
              href={`/Admin/edit/${gecko.id}`}
              className="rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white"
            >
              ✏
            </Link>

            <Link
              href={`/Admin/inventory/${gecko.id}/gallery`}
              className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white"
            >
              📷
            </Link>

            <Link
              href={`/Admin/inventory/${gecko.id}`}
              className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-bold text-black"
            >
              ⚖
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}