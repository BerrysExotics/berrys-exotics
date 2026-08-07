import Link from "next/link";

import { getPublicBreeders } from "@/lib/breeders/getPublicBreeders";

export default async function FoundationPage() {
  const breeders = await getPublicBreeders();

  return (
    <main className="min-h-screen bg-neutral-950 pt-36 pb-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <section className="text-center">

          <p className="text-lg font-semibold uppercase tracking-[0.35em] text-green-500">
            Berrys_Exotics
          </p>

          <h1 className="mt-6 text-6xl font-black">
            Our Foundation Collection
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-neutral-300">
            Every hatchling we produce begins here. Meet the proven
            breeders that make our projects possible.
          </p>

        </section>

        <section className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {breeders.map((breeder: any) => {
            const cover =
              breeder.breeder_images?.find(
                (img: any) => img.is_cover
              )?.image_url;

            return (
              <div
                key={breeder.id}
                className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition hover:border-green-500"
              >
                <div className="aspect-square bg-neutral-800">

                  {cover ? (
                    <img
                      src={cover}
                      alt={breeder.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      🦎
                    </div>
                  )}

                </div>

                <div className="space-y-3 p-6">

                  <h2 className="text-3xl font-black">
                    {breeder.name}
                  </h2>

                  <p className="text-green-400">
                    {breeder.morph}
                  </p>

                  <p className="text-neutral-400">
                    {breeder.species} • {breeder.sex}
                  </p>

                  <p className="text-neutral-300">
                    {breeder.description?.slice(0, 120) ||
                      "One of the foundation animals in our breeding program."}
                  </p>

                  <Link
                    href={`/foundation/${breeder.id}`}
                    className="mt-4 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-700"
                  >
                    Meet {breeder.name}
                  </Link>

                </div>
              </div>
            );
          })}

        </section>

      </div>
    </main>
  );
}