import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getBreederOffspring } from "@/lib/breeders/getBreederOffspring";

export default async function BreederPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: breeder } = await supabase
    .from("breeders")
    .select(`
      *,
      breeder_images (
        image_url,
        is_cover
      )
    `)
    .eq("id", id)
    .single();

  if (!breeder) {
    notFound();
  }

  const cover =
    breeder.breeder_images?.find(
      (img: any) => img.is_cover
    )?.image_url;

  const offspring = await getBreederOffspring(
    breeder.name
  );

  return (
    <main className="min-h-screen bg-neutral-950 pt-36 pb-20 text-white">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Breeder Image */}

          <div>

            {cover ? (
              <img
                src={cover}
                alt={breeder.name}
                className="aspect-square w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-3xl bg-neutral-900 text-8xl">
                🦎
              </div>
            )}

          </div>

          {/* Breeder Details */}

          <div className="space-y-6">

            <div>

              <h1 className="text-6xl font-black">
                {breeder.name}
              </h1>

              <p className="mt-3 text-2xl text-green-400">
                {breeder.morph}
              </p>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 space-y-5">

              <p>
                <strong>Species:</strong>{" "}
                {breeder.species}
              </p>

              <p>
                <strong>Sex:</strong>{" "}
                {breeder.sex}
              </p>

              <p>
                <strong>Weight:</strong>{" "}
                {breeder.weight ?? "--"} g
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {breeder.status}
              </p>

              <p>
                <strong>Hatch Date:</strong>{" "}
                {breeder.hatch_date || "Unknown"}
              </p>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

              <h2 className="mb-5 text-3xl font-bold">
                About
              </h2>

              <p className="leading-8 text-neutral-300">
                {breeder.description ||
                  "No description has been added yet."}
              </p>

            </div>

          </div>

        </div>

        {/* Produced Offspring */}

        <section className="mt-20">

          <h2 className="mb-8 text-4xl font-black">
            Produced Offspring
          </h2>

          {offspring.length === 0 ? (

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-12 text-center text-neutral-400">

              No offspring have been linked to this breeder yet.

            </div>

          ) : (

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {offspring.map((gecko: any) => {

                const image =
                  [...(gecko.gecko_images || [])]
                    .sort(
                      (a: any, b: any) =>
                        a.sort_order - b.sort_order
                    )[0]?.image;

                return (

                  <div
                    key={gecko.id}
                    className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition hover:border-green-500"
                  >

                    <div className="aspect-square bg-neutral-800">

                      {image ? (

                        <img
                          src={image}
                          alt={gecko.name}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-6xl">

                          🦎

                        </div>

                      )}

                    </div>

                    <div className="space-y-3 p-6">

                      <h3 className="text-2xl font-bold">

                        {gecko.name}

                      </h3>

                      <p className="text-green-400">

                        {gecko.morph}

                      </p>

                      <p className="text-neutral-400">

                        {gecko.sex}

                      </p>

                      <p className="font-bold">

                        {gecko.price
                          ? `$${gecko.price}`
                          : "Contact"}

                      </p>

                      <Link
                        href={`/collection/${gecko.id}`}
                        className="inline-block rounded-xl bg-green-600 px-5 py-3 font-bold transition hover:bg-green-700"
                      >
                        View Gecko
                      </Link>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>

        <div className="mt-12">

          <Link
            href="/foundation"
            className="font-semibold text-green-400 hover:text-green-300"
          >
            ← Back to Foundation Collection
          </Link>

        </div>

      </div>

    </main>
  );
}