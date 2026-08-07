import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectTimeline from "@/components/pairings/ProjectTimeline";
import { createClient } from "@/lib/supabase/server";

export default async function PairingDetailPage({
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
      name,
      species,
      morph,
      weight
    ),
    pairing_females (
      female:breeders (
        id,
        name,
        species,
        morph,
        weight
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
const { data: clutches } = await supabase
  .from("clutches")
  .select("*")
  .eq("pairing_id", pairing.id)
  .order("clutch_number");

const clutchCount = clutches?.length ?? 0;

const eggCount =
  clutches?.reduce(
    (total, clutch) => total + (clutch.eggs ?? 0),
    0
  ) ?? 0;
  const latestClutch =
  clutches && clutches.length > 0
    ? clutches[clutches.length - 1]
    : null;

const latestClutchDate =
  latestClutch?.laid_date ?? null;

// We'll replace this later when hatchlings are connected
const latestHatchDate = null;
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">

      <Link
        href="/Admin/pairings"
        className="inline-flex rounded-lg bg-neutral-800 px-4 py-2 text-white transition hover:bg-neutral-700"
      >
        ← Back to Pairings
      </Link>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

       <div>
  <h1 className="text-5xl font-black text-white">
    ❤️ {pairing.pairing_name}
  </h1>

  {pairing.start_date && (
    <p className="mt-2 text-neutral-400">
      Started{" "}
      {new Date(pairing.start_date).toLocaleDateString()}
    </p>
  )}
</div>

          <span className="inline-flex rounded-full bg-emerald-600 px-5 py-2 font-bold text-white">
            {pairing.status}
          </span>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border border-blue-700 bg-neutral-900 p-6">

          <p className="text-blue-400">
            Male
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            {male?.name}
          </h2>

          <p className="text-neutral-400">
            {male?.morph}
          </p>

          <p className="text-neutral-500">
            {male?.species}
          </p>

          <p className="mt-4 text-xl font-bold text-white">
            ⚖ {male?.weight ?? "--"} g
          </p>

        </div>

       <div className="rounded-2xl border border-pink-700 bg-neutral-900 p-6">

  <p className="text-pink-400">
    Females
  </p>

  {females.length === 0 ? (
    <p className="mt-4 text-neutral-400">
      No females assigned.
    </p>
  ) : (
    <div className="mt-4 space-y-4">
      {females.map((female: any) => (
        <div
          key={female.id}
          className="rounded-xl bg-neutral-800 p-4"
        >
          <h3 className="text-xl font-bold text-white">
            {female.name}
          </h3>

          <p className="text-neutral-400">
            {female.morph}
          </p>

          <p className="text-neutral-500">
            {female.species}
          </p>

          <p className="mt-2 font-semibold text-white">
            ⚖ {female.weight ?? "--"} g
          </p>
        </div>
      ))}
    </div>
  )}

</div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <p className="text-neutral-400">
            Clutches
          </p>

          <p className="mt-3 text-5xl font-black text-white">
            {clutchCount}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <p className="text-neutral-400">
            Eggs
          </p>

          <p className="mt-3 text-5xl font-black text-white">
            {eggCount}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <p className="text-neutral-400">
            Hatchlings
          </p>

          <p className="mt-3 text-5xl font-black text-white">
            0
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <p className="text-neutral-400">
            Success
          </p>

          <p className="mt-3 text-5xl font-black text-green-400">
            --
          </p>
        </div>
      <ProjectTimeline
  startDate={pairing.start_date}
  latestClutchDate={latestClutchDate}
  latestHatchDate={latestHatchDate}
  status={pairing.status}
/>
      </div>

      <div className="rounded-2xl border border-dashed border-neutral-700 p-16 text-center">

        <h2 className="text-3xl font-bold text-white">
          🥚 Clutches
        </h2>

       {clutchCount === 0 ? (
  <p className="mt-4 text-neutral-400">
    Clutches created from this pairing will appear here.
  </p>
) : (
  <div className="mt-8 space-y-4">
    {clutches!.map((clutch) => (
      <div
        key={clutch.id}
        className="rounded-xl border border-neutral-700 bg-neutral-900 p-5 text-left"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            Clutch #{clutch.clutch_number}
          </h3>

          <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-bold text-white">
            {clutch.status}
          </span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">

          <div>
            <p className="text-neutral-500">Laid</p>

            <p className="text-white">
              {clutch.laid_date
                ? new Date(
                    clutch.laid_date
                  ).toLocaleDateString()
                : "--"}
            </p>
          </div>

          <div>
            <p className="text-neutral-500">Eggs</p>

            <p className="text-white">
              {clutch.eggs}
            </p>
          </div>

          <div>
            <p className="text-neutral-500">Fertile</p>

            <p className="text-white">
              {clutch.fertile}
            </p>
          </div>

        </div>
      </div>
    ))}
  </div>
)}

        <div className="mt-8 flex justify-center gap-4">

          <Link
            href={`/Admin/clutches/add?pairing=${pairing.id}`}
            className="rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-700"
          >
            🥚 New Clutch
          </Link>

          <Link
            href="/Admin/clutches"
            className="rounded-xl bg-neutral-700 px-8 py-4 font-bold text-white transition hover:bg-neutral-600"
          >
            View Clutches
          </Link>

        </div>

      </div>

    </main>
  );
}