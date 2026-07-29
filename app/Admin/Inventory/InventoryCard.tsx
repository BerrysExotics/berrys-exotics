"use client";

import Link from "next/link";

export interface InventoryGecko {
  id: string;

  name: string;
  nickname?: string | null;

  species: string;
  morph: string;
  sex: string;

  weight?: number | null;

  price?: number | null;

  availability: string;

  featured: boolean;

  coverImage?: string | null;
}

interface Props {
  gecko: InventoryGecko;

  onFeature(): void;

  onDelete(): void;
}

export default function InventoryCard({
  gecko,
  onFeature,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl bg-neutral-800 p-6 shadow-lg transition hover:shadow-2xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

        <div className="flex gap-6">

          {gecko.coverImage ? (
            <img
              src={gecko.coverImage}
              alt={gecko.name}
              className="h-36 w-36 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-36 w-36 items-center justify-center rounded-xl bg-neutral-700 text-6xl">
              🦎
            </div>
          )}

          <div>

            <h2 className="text-3xl font-bold text-white">
              {gecko.name}
            </h2>

            {gecko.nickname && (
              <p className="text-green-400">
                "{gecko.nickname}"
              </p>
            )}

            <p className="mt-2 text-neutral-300">
              {gecko.species}
            </p>

            <p className="text-white">
              {gecko.morph}
            </p>

            <p className="text-neutral-400">
              {gecko.sex}
            </p>

            {gecko.weight && (
              <p className="text-neutral-400">
                {gecko.weight} g
              </p>
            )}

            <p
              className={`mt-3 font-bold ${
                gecko.availability === "Available"
                  ? "text-green-400"
                  : gecko.availability === "Sold"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {gecko.availability}
            </p>

            {gecko.price != null && (
              <p className="mt-3 text-3xl font-black text-green-400">
                ${gecko.price}
              </p>
            )}

            {gecko.featured && (
              <span className="mt-3 inline-block rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
                ⭐ Featured
              </span>
            )}

          </div>

        </div>

        <div className="flex flex-wrap gap-3 lg:flex-col">

          <Link
            href={`/collection/${gecko.id}`}
            target="_blank"
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            👁 Preview
          </Link>

          <Link
            href={`/Admin/edit/${gecko.id}`}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ✏ Edit
          </Link>

          <button
            onClick={onFeature}
            className={`rounded-lg px-5 py-3 font-semibold transition ${
              gecko.featured
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }`}
          >
            {gecko.featured ? "⭐ Featured" : "☆ Feature"}
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>
  );
}