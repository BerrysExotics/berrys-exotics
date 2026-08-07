"use client";

import Link from "next/link";

import { deleteHatchling } from "@/lib/hatchlings/deleteHatchling";

interface Props {
  hatchling: any;
}

export default function HatchlingCard({
  hatchling,
}: Props) {

  async function handleDelete(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${hatchling.name || `Hatchling #${hatchling.hatchling_number}`}"?`
    );

    if (!confirmed) return;

    try {
      await deleteHatchling(hatchling.id);

      alert("Hatchling deleted.");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Unable to delete hatchling.");
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-green-500">

      <Link
        href={`/Admin/hatchlings/${hatchling.id}`}
        className="block"
      >

        <h2 className="text-2xl font-bold text-white">
          {hatchling.name ||
            `Hatchling #${hatchling.hatchling_number}`}
        </h2>

        <p className="mt-3 text-neutral-400">
          {hatchling.clutch?.pairing?.pairing_name}
        </p>

        <p className="mt-2 text-neutral-400">
          Clutch #{hatchling.clutch?.clutch_number}
        </p>

        <div className="mt-4 inline-flex rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
          {hatchling.status}
        </div>

        {hatchling.morph && (
          <p className="mt-4 text-neutral-300">
            {hatchling.morph}
          </p>
        )}

      </Link>

      <div className="mt-6">

        <button
          onClick={handleDelete}
          className="w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
        >
          🗑 Delete Hatchling
        </button>

      </div>

    </div>
  );
}