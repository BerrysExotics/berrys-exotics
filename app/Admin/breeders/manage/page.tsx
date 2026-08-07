import Link from "next/link";

import BreederManager from "@/components/breeders/BreederManager";
import BreederStats from "@/components/breeders/BreederStats";

import { getBreeders } from "@/lib/breeders/getBreeders";
import { getBreederStats } from "@/lib/breeders/getBreederStats";

export default async function ManageBreedersPage() {
  const [breeders, stats] = await Promise.all([
    getBreeders(),
    getBreederStats(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10 flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-black text-white">
            Manage Breeders
          </h1>

          <p className="mt-2 text-neutral-400">
            View, search, filter and manage your breeder collection.
          </p>
        </div>

        <Link
          href="/Admin/breeders/add"
          className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
        >
          + Add Breeder
        </Link>

      </div>

      <div className="mb-10">
        <BreederStats stats={stats} />
      </div>

      {breeders.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-12 text-center">

          <h2 className="text-2xl font-bold text-white">
            No breeders found
          </h2>

          <p className="mt-4 text-neutral-400">
            Promote a gecko from your inventory or add a breeder to get started.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <Link
              href="/Admin/inventory"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              🦎 Inventory
            </Link>

            <Link
              href="/Admin/breeders/add"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              ➕ Add Breeder
            </Link>

          </div>

        </div>
      ) : (
        <BreederManager breeders={breeders} />
      )}

    </main>
  );
}