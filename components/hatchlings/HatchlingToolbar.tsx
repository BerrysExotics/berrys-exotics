import Link from "next/link";

interface Props {
  hatchlingCount: number;
}

export default function HatchlingToolbar({
  hatchlingCount,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Hatchlings
        </h2>

        <p className="text-neutral-400">
          {hatchlingCount} hatchling
          {hatchlingCount !== 1 && "s"}
        </p>
      </div>

      <Link
        href="/Admin/hatchlings/add"
        className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700"
      >
        + New Hatchling
      </Link>
    </div>
  );
}