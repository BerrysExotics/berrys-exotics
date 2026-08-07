import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BreederProfilePage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: breeder, error } = await supabase
    .from("breeders")
    .select(`
      *,
      geckos (
        id,
        animal_id,
        name,
        species,
        morph,
        sex,
        weight,
        status,
        availability,
        gecko_images (
          image,
          is_cover
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !breeder) {
    console.error(error);
    notFound();
  }

  const gecko = breeder.geckos;

  const coverImage =
    gecko?.gecko_images?.find(
      (img: any) => img.is_cover
    )?.image ?? null;

  return (
    <main className="min-h-screen bg-neutral-900 py-12 text-white">

      <div className="mx-auto max-w-7xl space-y-8 px-6">

        <Link
          href="/Admin/breeders/manage"
          className="inline-flex rounded-xl bg-neutral-800 px-5 py-3 font-bold transition hover:bg-neutral-700"
        >
          ← Back to Breeders
        </Link>

        {/* Hero */}

        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl">

          <div className="flex flex-col lg:flex-row">

            {/* Photo */}

            <div className="flex w-full items-center justify-center border-b border-neutral-800 bg-neutral-950 p-8 lg:w-[420px] lg:border-b-0 lg:border-r">

              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={gecko?.name ?? "Breeder"}
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

            {/* Info */}

            <div className="flex flex-1 flex-col p-10">

              {gecko?.animal_id && (
                <div className="mb-4 inline-flex w-fit rounded-full bg-emerald-600 px-5 py-2 text-sm font-black tracking-[0.2em] text-white">
                  {gecko.animal_id}
                </div>
              )}

              <h1 className="text-5xl font-black">
                {gecko?.name}
              </h1>

              <p className="mt-3 text-2xl text-emerald-400">
                {gecko?.morph || "Unknown Morph"}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <span className="rounded-full bg-purple-600 px-5 py-2 font-bold">
                  ⭐ Active Breeder
                </span>

                <span className="rounded-full bg-neutral-700 px-5 py-2">
                  {gecko?.species}
                </span>

                <span className="rounded-full bg-neutral-700 px-5 py-2">
                  {gecko?.sex}
                </span>

                {gecko?.weight && (
                  <span className="rounded-full bg-neutral-700 px-5 py-2">
                    ⚖ {gecko.weight} g
                  </span>
                )}

              </div>

              {/* Quick Actions */}

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <Link
                  href={`/Admin/edit/${gecko?.id}`}
                  className="rounded-xl bg-blue-600 py-3 text-center font-bold transition hover:bg-blue-700"
                >
                  ✏ Edit
                </Link>

                <Link
                  href={`/Admin/inventory/${gecko?.id}/gallery`}
                  className="rounded-xl bg-purple-600 py-3 text-center font-bold transition hover:bg-purple-700"
                >
                  📷 Gallery
                </Link>

                <Link
                  href="/Admin/pairings"
                  className="rounded-xl bg-pink-600 py-3 text-center font-bold transition hover:bg-pink-700"
                >
                  ❤️ Pairings
                </Link>

                <Link
                  href={`/Admin/inventory/${gecko?.id}`}
                  className="rounded-xl bg-emerald-600 py-3 text-center font-bold transition hover:bg-emerald-700"
                >
                  🦎 Collection Page
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-sm text-neutral-400">
              Active Pairings
            </p>

            <h2 className="mt-3 text-5xl font-black text-pink-400">
              —
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-sm text-neutral-400">
              Clutches Produced
            </p>

            <h2 className="mt-3 text-5xl font-black text-yellow-400">
              —
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-sm text-neutral-400">
              Hatchlings Produced
            </p>

            <h2 className="mt-3 text-5xl font-black text-sky-400">
              —
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-sm text-neutral-400">
              Fertility Rate
            </p>

            <h2 className="mt-3 text-5xl font-black text-emerald-400">
              —
            </h2>
          </div>

        </div>

      </div>

    </main>
  );
}