import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/server";

import PromoteBreederButton from "@/components/geckos/PromoteBreederButton";
import InventoryOverview from "@/components/geckos/InventoryOverview";
import LineageCard from "@/components/geckos/LineageCard";
import WeightHistoryCard from "@/components/geckos/WeightHistoryCard";
import GrowthStats from "@/components/geckos/GrowthStats";
import GrowthChart from "@/components/geckos/GrowthChart";

import { getWeightHistory } from "@/lib/geckos/getWeightHistory";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InventoryGeckoPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: gecko, error } = await supabase
    .from("geckos")
    .select(`
      *,
      gecko_images (
        image,
        is_cover
      ),
      hatchling:hatchling_id (
        hatchling_number,
        hatch_date,
        clutch:clutch_id (
          clutch_number,
          pairing:pairing_id (
            pairing_name,
            male:male_id (
              name
            ),
            female:female_id (
              name
            )
          )
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !gecko) {
    console.error(error);
    notFound();
  }

  const coverImage =
    gecko.gecko_images?.find(
      (img: any) => img.is_cover
    )?.image ?? null;

  const weights = await getWeightHistory(gecko.id);

  return (
    <main className="min-h-screen bg-neutral-900 pt-36 pb-12 text-white">
      <div className="mx-auto max-w-7xl space-y-8">

        <Link
          href="/Admin/inventory"
          className="inline-flex rounded-xl bg-neutral-800 px-5 py-3 font-bold transition hover:bg-neutral-700"
        >
          ← Back to My Collection
        </Link>

        {/* Hero Card */}

        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl">

          <div className="flex flex-col lg:flex-row">

            {/* Image */}

            <div className="flex w-full items-center justify-center border-b border-neutral-800 bg-neutral-950 p-8 lg:w-[420px] lg:border-b-0 lg:border-r">

              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={gecko.name}
                  width={500}
                  height={500}
                  className="h-[360px] w-[360px] rounded-3xl object-cover"
                />
              ) : (
                <div className="flex h-[360px] w-[360px] items-center justify-center rounded-3xl bg-neutral-800 text-8xl">
                  🦎
                </div>
              )}

            </div>

            {/* Information */}

            <div className="flex flex-1 flex-col p-10">

              {gecko.animal_id && (
                <div className="mb-4 inline-flex w-fit rounded-full bg-emerald-600 px-5 py-2 text-sm font-black tracking-[0.2em] text-white">
                  {gecko.animal_id}
                </div>
              )}

              <h1 className="text-5xl font-black">
                {gecko.name}
              </h1>

              <p className="mt-3 text-2xl text-emerald-400">
                {gecko.morph || "Unknown Morph"}
              </p>

              {/* Status */}

              <div className="mt-8 flex flex-wrap gap-3">

                <span className="rounded-full bg-blue-600 px-5 py-2 font-bold text-white">
                  {gecko.status}
                </span>

                <span className="rounded-full bg-neutral-700 px-5 py-2 font-bold text-white">
                  {gecko.availability}
                </span>

                <span className="rounded-full bg-neutral-700 px-5 py-2 text-white">
                  {gecko.species}
                </span>

                <span className="rounded-full bg-neutral-700 px-5 py-2 text-white">
                  {gecko.sex}
                </span>

                {gecko.weight != null && (
                  <span className="rounded-full bg-neutral-700 px-5 py-2 text-white">
                    ⚖ {gecko.weight} g
                  </span>
                )}

              </div>

              {/* Buttons */}

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <Link
                  href={`/Admin/inventory/${gecko.id}/gallery`}
                  className="rounded-xl bg-purple-600 py-3 text-center font-bold transition hover:bg-purple-700"
                >
                  📷 Gallery
                </Link>

                <Link
                  href={`/Admin/edit/${gecko.id}`}
                  className="rounded-xl bg-blue-600 py-3 text-center font-bold transition hover:bg-blue-700"
                >
                  ✏ Edit Gecko
                </Link>

                <Link
                  href={`/collection/${gecko.id}`}
                  target="_blank"
                  className="rounded-xl bg-green-600 py-3 text-center font-bold transition hover:bg-green-700"
                >
                  👁 Preview Listing
                </Link>

                <PromoteBreederButton geckoId={gecko.id} />

              </div>

            </div>

          </div>

        </div>

        {/* Information Cards */}

        <InventoryOverview
          gecko={gecko}
        />

        <LineageCard
          hatchling={gecko.hatchling}
        />

        <WeightHistoryCard
          geckoId={gecko.id}
          currentWeight={gecko.weight}
          weights={weights}
        />

        <GrowthStats
          currentWeight={gecko.weight}
          weights={weights}
        />

        <GrowthChart
          weights={weights}
        />

      </div>
    </main>
  );
}