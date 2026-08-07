"use client";

import Link from "next/link";

import HatchClutchModal from "@/components/hatchlings/HatchClutchModal";

import { deleteClutch } from "@/lib/clutches/deleteClutch";

interface Props {
  clutch: any;
}

export default function ClutchCard({
  clutch,
}: Props) {
  const eggCount = Array.isArray(clutch.eggs)
    ? clutch.eggs.length
    : clutch.eggs ?? 0;

  const fertileCount = Array.isArray(clutch.eggs)
    ? clutch.eggs.filter(
        (egg: any) => egg.status !== "Infertile"
      ).length
    : clutch.fertile ?? 0;

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete Clutch #${clutch.clutch_number}?\n\nThis will also delete all eggs in this clutch.`
    );

    if (!confirmed) return;

    try {
      await deleteClutch(clutch.id);

      alert("Clutch deleted successfully.");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete clutch.");
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-xl transition hover:border-emerald-500">

      {/* Header */}

      <div className="border-b border-neutral-800 p-6">

        <p className="mb-2 font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Clutch #{clutch.clutch_number}
        </p>

        <h2 className="text-3xl font-black text-white">
          {clutch.pairing?.pairing_name}
        </h2>

      </div>

      {/* Details */}

      <div className="grid grid-cols-2 gap-6 p-6">

        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-500">
            Eggs
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            🥚 {eggCount}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-500">
            Fertile
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-400">
            ✅ {fertileCount}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-500">
            Incubator
          </p>

          <p className="mt-1 font-semibold text-white">
            {clutch.incubator || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-500">
            Status
          </p>

          <div className="mt-2">
            <span
              className={`rounded-full px-4 py-1 text-sm font-bold ${
                clutch.status === "Incubating"
                  ? "bg-emerald-600 text-white"
                  : clutch.status === "Hatched"
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-700 text-white"
              }`}
            >
              {clutch.status}
            </span>
          </div>
        </div>

      </div>

      {/* Notes */}

      {clutch.notes && (
        <div className="border-t border-neutral-800 px-6 py-5">

          <h3 className="mb-2 font-bold text-white">
            Notes
          </h3>

          <p className="leading-7 text-neutral-400">
            {clutch.notes}
          </p>

        </div>
      )}

      {/* Buttons */}

      <div className="border-t border-neutral-800 p-6">

        <div className="grid grid-cols-2 gap-3">

          <Link
            href={`/Admin/clutches/edit/${clutch.id}`}
            className="rounded-xl bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-700"
          >
            ✏ Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
          >
            🗑 Delete
          </button>

        </div>

        <div className="mt-4">

          {clutch.status === "Incubating" ? (
            <HatchClutchModal clutch={clutch} />
          ) : (
            <div className="rounded-xl bg-neutral-800 py-3 text-center font-bold text-neutral-400">
              ✅ Already Hatched
            </div>
          )}

        </div>

      </div>

    </div>
  );
}