import { notFound } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function AvailableGeckoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: gecko, error } = await supabase
    .from("hatchlings")
    .select(`
      *,
      clutch:clutches(
        clutch_number,
        pairing:pairings(
          pairing_name,
          male:breeders!pairings_male_id_fkey(name),
          female:breeders!pairings_female_id_fkey(name)
        )
      )
    `)
    .eq("id", id)
    .eq("status", "Available")
    .single();

  if (error || !gecko) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">

      <Link
        href="/available"
        className="mb-8 inline-flex rounded-lg bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700"
      >
        ← Back to Available Geckos
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">

        <div className="aspect-square rounded-3xl bg-neutral-800" />

        <div>

          <h1 className="text-5xl font-black">
            {gecko.name || `Hatchling #${gecko.hatchling_number}`}
          </h1>

          <p className="mt-3 text-xl text-neutral-400">
            {gecko.morph || "Unknown Morph"}
          </p>

          <div className="mt-8 space-y-4">

            <Info
              title="Sex"
              value={gecko.sex || "Unknown"}
            />

            <Info
              title="Weight"
              value={`${gecko.weight ?? "-"} g`}
            />

            <Info
              title="Hatch Date"
              value={gecko.hatch_date || "-"}
            />

            <Info
              title="Pairing"
              value={gecko.clutch?.pairing?.pairing_name || "-"}
            />

            <Info
              title="Sire"
              value={gecko.clutch?.pairing?.male?.name || "-"}
            />

            <Info
              title="Dam"
              value={gecko.clutch?.pairing?.female?.name || "-"}
            />

          </div>

          <div className="mt-12 rounded-2xl bg-green-700 p-8 text-center">

            <h2 className="text-3xl font-black">
              Interested?
            </h2>

            <p className="mt-3">
              Contact Berrys_Exotics for availability,
              pricing and shipping.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-neutral-800 py-3">
      <span className="font-semibold">
        {title}
      </span>

      <span className="text-neutral-400">
        {value}
      </span>
    </div>
  );
}