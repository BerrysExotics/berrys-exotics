import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function AvailablePage() {
  const supabase = await createClient();

  const { data: geckos } = await supabase
    .from("hatchlings")
    .select(`
      *,
      clutch:clutches(
        clutch_number,
        pairing:pairings(
          pairing_name
        )
      )
    `)
    .eq("status", "Available")
    .order("weight", {
      ascending: false,
    });

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-12 text-center">

        <h1 className="text-6xl font-black">
          Available Geckos
        </h1>

        <p className="mt-4 text-neutral-500">
          Healthy captive-bred geckos from Berrys_Exotics.
        </p>

      </div>

      {geckos?.length === 0 && (
        <div className="rounded-3xl border border-dashed border-neutral-700 p-20 text-center">

          <div className="text-7xl">
            🦎
          </div>

          <h2 className="mt-8 text-3xl font-bold">
            No Geckos Available
          </h2>

          <p className="mt-3 text-neutral-500">
            Check back soon for new hatchlings.
          </p>

        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {geckos?.map((gecko) => (

          <Link
            key={gecko.id}
            href={`/available/${gecko.id}`}
            className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-green-500"
          >

            <div className="aspect-square rounded-2xl bg-neutral-800" />

            <h2 className="mt-6 text-2xl font-black">
              {gecko.name || `Hatchling #${gecko.hatchling_number}`}
            </h2>

            <p className="mt-2 text-neutral-400">
              {gecko.morph || "Unknown Morph"}
            </p>

            <p className="mt-3 text-neutral-500">
              {gecko.weight ?? "-"} g
            </p>

            <div className="mt-6 inline-flex rounded-full bg-green-600 px-4 py-2 text-white">
              Available
            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}