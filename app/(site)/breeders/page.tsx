import { getPairings } from "@/lib/pairings/getPairings";
import PairingGrid from "@/components/pairings/PairingGrid";

export default async function BreedersPage() {
  const pairings = await getPairings();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      <section className="border-b border-neutral-800 bg-neutral-900">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <p className="mb-3 font-semibold uppercase tracking-[0.35em] text-emerald-400">
            Berrys_Exotics
          </p>

          <h1 className="text-5xl font-black md:text-6xl">
            Our Breeding Groups
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
            Every breeding group has been carefully planned to produce
            healthy, high-quality offspring with outstanding genetics,
            structure, color, and temperament. Meet the animals producing
            the next generation of Berrys_Exotics.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        {pairings.length === 0 ? (

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 py-20 text-center">

            <div className="text-7xl">
              🦎
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              Breeding Groups Coming Soon
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              Our breeding projects will be showcased here as our collection
              continues to grow.
            </p>

          </div>

        ) : (

          <PairingGrid
            pairings={pairings}
            isPublic
          />

        )}

      </section>

    </main>
  );
}