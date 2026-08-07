import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function PublicBreedingGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: pairing, error } = await supabase
    .from("pairings")
    .select(`
      *,
      male:breeders!pairings_male_id_fkey (
        id,
        gecko_id,
        name,
        species,
        morph,
        weight,
        geckos (
          gecko_images (
            image,
            is_cover
          )
        )
      ),
      pairing_females (
        female:breeders (
          id,
          gecko_id,
          name,
          species,
          morph,
          weight,
          geckos (
            gecko_images (
              image,
              is_cover
            )
          )
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !pairing) {
    console.error(error);
    notFound();
  }

  const male = pairing.male;

  const females =
    pairing.pairing_females?.map(
      (pf: any) => pf.female
    ) ?? [];

  const maleImage =
    male?.geckos?.gecko_images?.find(
      (img: any) => img.is_cover
    )?.image ?? null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      <section className="border-b border-neutral-800 bg-neutral-900">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <Link
            href="/breeders"
            className="inline-flex rounded-lg bg-neutral-800 px-5 py-3 font-semibold transition hover:bg-neutral-700"
          >
            ← Back to Breeding Groups
          </Link>

          <h1 className="mt-10 text-5xl font-black">
            {pairing.pairing_name}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-neutral-400">
            Meet the breeders responsible for this project.
          </p>

        </div>

      </section>

     <section className="mx-auto max-w-7xl px-6 py-16">

<div className="grid gap-8 lg:grid-cols-2">

  {/* Male */}

  <div className="rounded-3xl border border-blue-700 bg-neutral-900 p-8">

    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
      ♂ Male
    </p>

    <Link href={`/breeders/${male?.gecko_id}`}>

      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-800">

        {maleImage ? (
          <Image
            src={maleImage}
            alt={male?.name ?? ""}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl">
            🦎
          </div>
        )}

      </div>

      <h2 className="mt-6 text-4xl font-black transition hover:text-emerald-400">
        {male?.name}
      </h2>

    </Link>

    <p className="mt-3 text-xl text-emerald-400">
      {male?.morph}
    </p>

    <p className="mt-2 text-neutral-400">
      {male?.species}
    </p>

    <p className="mt-6 text-xl font-bold">
      ⚖ {male?.weight ?? "--"} g
    </p>

  </div>

  {/* Females */}

  <div className="rounded-3xl border border-pink-700 bg-neutral-900 p-8">

    <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
      ♀ Females
    </p>

    <div className="space-y-5">

      {females.map((female: any) => {
        const image =
          female?.geckos?.gecko_images?.find(
            (img: any) => img.is_cover
          )?.image ?? null;

        return (
          <Link
            key={female.id}
            href={`/breeders/${female.gecko_id}`}
            className="block rounded-2xl bg-neutral-800 p-5 transition hover:bg-neutral-700"
          >

            <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-700">

              {image ? (
                <Image
                  src={image}
                  alt={female.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">
                  🦎
                </div>
              )}

            </div>

            <h3 className="mt-4 text-2xl font-bold">
              {female.name}
            </h3>

            <p className="text-neutral-400">
              {female.morph}
            </p>

            <p className="text-neutral-500">
              {female.species}
            </p>

            <p className="mt-2 font-semibold">
              ⚖ {female.weight ?? "--"} g
            </p>

          </Link>
        );
      })}

    </div>

  </div>

</div>

</section>

</main>

);
}