import Link from "next/link";

import InventoryManager from "./InventoryManager";

export default function MyCollectionPage() {
  return (
    <main className="min-h-screen bg-neutral-900 p-10 text-white">

      {/* Header */}

      <div className="mb-12 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

        <div>

          <p className="font-semibold uppercase tracking-[0.35em] text-emerald-400">
            Collection Management
          </p>

          <h1 className="mt-3 text-5xl font-black">
            My Collection
          </h1>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-neutral-400">
            Manage every gecko in your collection from one place.
            Add new animals, organize breeders, monitor holdbacks,
            update galleries, track weights, and build your breeding
            program.
          </p>

        </div>

        {/* Quick Actions */}

        <div className="grid gap-4 sm:grid-cols-2 xl:w-[500px]">

          <Link
            href="/Admin/inventory/add"
            className="rounded-2xl bg-emerald-600 px-6 py-5 text-center font-bold text-white transition hover:bg-emerald-700"
          >
            ➕ Add Gecko
          </Link>

          <Link
            href="/Admin/breeders/manage"
            className="rounded-2xl bg-purple-600 px-6 py-5 text-center font-bold text-white transition hover:bg-purple-700"
          >
            ⭐ Breeders
          </Link>

          <Link
            href="/Admin/pairings"
            className="rounded-2xl bg-pink-600 px-6 py-5 text-center font-bold text-white transition hover:bg-pink-700"
          >
            ❤️ Breeding Groups
          </Link>

          <Link
            href="/collection"
            target="_blank"
            className="rounded-2xl bg-blue-600 px-6 py-5 text-center font-bold text-white transition hover:bg-blue-700"
          >
            🌐 View Website
          </Link>

        </div>

      </div>

      <InventoryManager />

    </main>
  );
}