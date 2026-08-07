import Link from "next/link";

interface Props {
  clutchCount: number;
}

export default function ClutchToolbar({
  clutchCount,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="mb-2 font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Clutch Overview
          </p>

          <h2 className="text-3xl font-black text-white">
            {clutchCount}{" "}
            {clutchCount === 1 ? "Clutch" : "Clutches"}
          </h2>

          <p className="mt-3 max-w-xl text-neutral-400">
            Every clutch recorded here is linked directly to a breeding
            group, allowing complete tracking from breeding through
            incubation, hatching, and eventually to available geckos.
          </p>

        </div>

        <div className="flex flex-wrap gap-4">

          <Link
            href="/Admin/clutches/add"
            className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            + Record Clutch
          </Link>

          <Link
            href="/Admin/pairings"
            className="rounded-xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
          >
            View Breeding Groups
          </Link>

        </div>

      </div>

    </div>
  );
}