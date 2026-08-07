"use client";

import Image from "next/image";
import Link from "next/link";

import { BreederListItem } from "@/lib/breeders/getBreeders";

interface Props {
  breeder: BreederListItem;
}

export default function BreederCard({
  breeder,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg transition hover:border-emerald-500">

      <div className="relative h-64 w-full bg-neutral-800">
        {breeder.coverImage ? (
          <Image
            src={breeder.coverImage}
            alt={breeder.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            🦎
          </div>
        )}
      </div>

      <div className="space-y-3 p-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            {breeder.name}
          </h2>

          <p className="text-neutral-400">
            {breeder.species} • {breeder.sex}
          </p>
        </div>

        <p className="text-sm text-neutral-300">
          <span className="font-semibold">
            Morph:
          </span>{" "}
          {breeder.morph || "Unknown"}
        </p>

        <p className="text-sm text-neutral-300">
          <span className="font-semibold">
            Weight:
          </span>{" "}
          {breeder.weight ?? "--"} g
        </p>

        <p className="text-sm text-neutral-300">
          <span className="font-semibold">
            Status:
          </span>{" "}
          {breeder.status}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-4">

          <Link
            href={`/Admin/breeders/edit/${breeder.breederId}`}
            className="rounded-lg bg-blue-600 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Edit
          </Link>

          <Link
            href={`/Admin/inventory/${breeder.geckoId}`}
            className="rounded-lg bg-emerald-600 py-2 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            View Gecko
          </Link>

        </div>

      </div>

    </div>
  );
}