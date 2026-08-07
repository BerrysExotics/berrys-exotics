import Link from "next/link";

interface Props {
  pairingCount: number;
}

export default function PairingToolbar({
  pairingCount,
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-neutral-800 bg-neutral-900 p-8 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <p className="font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Collection Overview
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          🦎 Breeding Groups
        </h2>

        <p className="mt-3 text-lg text-neutral-400">
          {pairingCount} breeding group
          {pairingCount !== 1 && "s"} in your collection.
        </p>

      </div>

      <Link
        href="/Admin/pairings/add"
        className="rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-700"
      >
        ➕ New Breeding Group
      </Link>

    </div>
  );
}