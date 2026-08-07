"use client";

import Link from "next/link";

import { promoteToBreederAction } from "@/app/actions/geckos";

export interface InventoryGecko {
  id: string;

  animal_id?: string | null;

  name: string;
  nickname?: string | null;

  species: string;
  morph: string;
  sex: string;

  weight?: number | null;

  price?: number | null;

  status: string;

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

  async function handlePromote() {
    try {
      await promoteToBreederAction(gecko.id);

      alert(`${gecko.name} has been promoted to a breeder.`);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Unable to promote breeder.");
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-xl transition hover:border-emerald-500">

      <div className="flex flex-col lg:flex-row">

        {/* Image */}

        <div className="flex w-full items-center justify-center border-b border-neutral-800 bg-neutral-950 p-6 lg:w-72 lg:border-b-0 lg:border-r">

          {gecko.coverImage ? (
            <img
              src={gecko.coverImage}
              alt={gecko.name}
              className="h-56 w-56 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-2xl bg-neutral-800 text-8xl">
              🦎
            </div>
          )}

        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col p-8">

          {/* Header */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

            <div>

              {gecko.animal_id && (
                <div className="mb-3 inline-flex rounded-full bg-emerald-600 px-4 py-1 text-sm font-black tracking-wider text-white">
                  {gecko.animal_id}
                </div>
              )}

              <h2 className="text-4xl font-black text-white">
                {gecko.name || "Unnamed Gecko"}
              </h2>

              {gecko.nickname && (
                <p className="mt-2 text-lg text-emerald-400">
                  "{gecko.nickname}"
                </p>
              )}

              <p className="mt-3 text-lg text-neutral-300">
                {gecko.species}
              </p>

              <p className="text-neutral-400">
                {gecko.morph}
              </p>

              <p className="text-neutral-500">
                {gecko.sex}
              </p>

              {gecko.weight != null && (
                <p className="mt-2 text-neutral-400">
                  ⚖ {gecko.weight} g
                </p>
              )}

            </div>

            {/* Badges */}

            <div className="flex flex-wrap justify-start gap-2 lg:justify-end">

              {gecko.status === "Breeder" && (
                <span className="rounded-full bg-purple-600 px-4 py-2 text-sm font-bold text-white">
                  ⭐ Breeder
                </span>
              )}

              {gecko.status === "Holdback" && (
                <span className="rounded-full bg-lime-600 px-4 py-2 text-sm font-bold text-white">
                  🌱 Holdback
                </span>
              )}

              {gecko.status === "Retired" && (
                <span className="rounded-full bg-neutral-700 px-4 py-2 text-sm font-bold text-white">
                  👴 Retired
                </span>
              )}

              {gecko.availability === "Available" && (
                <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
                  🟢 Available
                </span>
              )}

              {gecko.availability === "On Hold" && (
                <span className="rounded-full bg-yellow-600 px-4 py-2 text-sm font-bold text-white">
                  🟡 On Hold
                </span>
              )}

              {gecko.availability === "Sold" && (
                <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
                  🔴 Sold
                </span>
              )}

              {gecko.availability === "Not For Sale" && (
                <span className="rounded-full bg-blue-700 px-4 py-2 text-sm font-bold text-white">
                  🔒 Not For Sale
                </span>
              )}

              {gecko.featured && (
                <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                  ⭐ Featured
                </span>
              )}

            </div>

          </div>

          {/* Price */}

          {gecko.price != null && (
            <div className="mt-8">
              <p className="text-5xl font-black text-emerald-400">
                ${gecko.price.toLocaleString()}
              </p>
            </div>
          )}

          {/* Buttons */}

          <div className="mt-10 grid gap-3 md:grid-cols-3 xl:grid-cols-6">

            <Link
              href={`/collection/${gecko.id}`}
              target="_blank"
              className="rounded-xl bg-green-600 py-3 text-center font-bold text-white transition hover:bg-green-700"
            >
              👁 Preview
            </Link>

            <Link
              href={`/Admin/edit/${gecko.id}`}
              className="rounded-xl bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-700"
            >
              ✏ Edit
            </Link>

            <Link
              href={`/Admin/inventory/${gecko.id}/gallery`}
              className="rounded-xl bg-indigo-600 py-3 text-center font-bold text-white transition hover:bg-indigo-700"
            >
              📸 Gallery
            </Link>

            <Link
              href={`/Admin/weights/${gecko.id}`}
              className="rounded-xl bg-orange-600 py-3 text-center font-bold text-white transition hover:bg-orange-700"
            >
              ⚖ Weights
            </Link>

            {gecko.status !== "Breeder" ? (
              <button
                onClick={handlePromote}
                className="rounded-xl bg-purple-600 py-3 font-bold text-white transition hover:bg-purple-700"
              >
                🦎 Promote
              </button>
            ) : (
              <div className="flex items-center justify-center rounded-xl bg-neutral-800 py-3 font-bold text-neutral-400">
                ✓ Breeder
              </div>
            )}

            <button
              onClick={onFeature}
              className={`rounded-xl py-3 font-bold transition ${
                gecko.featured
                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                  : "bg-yellow-500 text-black hover:bg-yellow-600"
              }`}
            >
              {gecko.featured ? "⭐ Featured" : "☆ Feature"}
            </button>

          </div>

          <button
            onClick={onDelete}
            className="mt-4 rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
          >
            🗑 Delete Gecko
          </button>

        </div>

      </div>

    </div>
  );
}