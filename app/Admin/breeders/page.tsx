import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function BreedersPage() {
  const supabase = await createClient();

  const [
    { count: breederCount },
    { count: pairingCount },
    { count: clutchCount },
    { count: hatchlingCount },
  ] = await Promise.all([
    supabase
      .from("breeders")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("pairings")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("clutches")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("hatchlings")
      .select("*", {
        count: "exact",
        head: true,
      }),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Breeder Management
        </h1>

        <p className="mt-2 text-neutral-400">
          Manage your breeding collection, pairings,
          clutches and offspring.
        </p>
      </div>

      {/* Quick Stats */}

      <div className="mb-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="text-sm text-neutral-400">
            Active Breeders
          </h3>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {breederCount ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="text-sm text-neutral-400">
            Active Pairings
          </h3>

          <p className="mt-2 text-3xl font-bold text-pink-400">
            {pairingCount ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="text-sm text-neutral-400">
            Clutches
          </h3>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {clutchCount ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="text-sm text-neutral-400">
            Hatchlings
          </h3>

          <p className="mt-2 text-3xl font-bold text-sky-400">
            {hatchlingCount ?? 0}
          </p>
        </div>

      </div>

      {/* Actions */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Link
          href="/Admin/breeders/add"
          className="rounded-xl border border-emerald-600 bg-emerald-950 p-8 transition hover:bg-emerald-900"
        >
          <h2 className="text-2xl font-bold">
            ➕ Add Breeder
          </h2>

          <p className="mt-3 text-neutral-300">
            Create a new breeder profile.
          </p>
        </Link>

        <Link
          href="/Admin/breeders/manage"
          className="rounded-xl border border-blue-600 bg-blue-950 p-8 transition hover:bg-blue-900"
        >
          <h2 className="text-2xl font-bold">
            📋 Manage Breeders
          </h2>

          <p className="mt-3 text-neutral-300">
            View, edit and organize breeders.
          </p>
        </Link>

        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-8">
          <h2 className="text-2xl font-bold">
            ❤️ Pairings
          </h2>

          <p className="mt-3 text-neutral-400">
            Coming Soon
          </p>
        </div>

        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-8">
          <h2 className="text-2xl font-bold">
            🥚 Clutches
          </h2>

          <p className="mt-3 text-neutral-400">
            Coming Soon
          </p>
        </div>

        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-8">
          <h2 className="text-2xl font-bold">
            🦎 Hatchlings
          </h2>

          <p className="mt-3 text-neutral-400">
            Coming Soon
          </p>
        </div>

      </div>

    </main>
  );
}