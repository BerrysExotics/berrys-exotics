"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { hatchClutch } from "@/lib/hatchlings/hatchClutch";

interface Props {
  clutch: any;
}

export default function HatchClutchModal({
  clutch,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [count, setCount] = useState(
    clutch.fertile ?? 0
  );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [date, setDate] = useState(today);

  async function handleHatch() {
    if (saving) return;

    try {
      setSaving(true);

      await hatchClutch(
        clutch.id,
        Number(count),
        date
      );

      alert("Clutch hatched successfully!");

      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to hatch clutch.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
      >
        🐣 Hatch
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

          <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-8">

            <h2 className="text-3xl font-black text-white">
              🐣 Hatch Clutch
            </h2>

            <p className="mt-3 text-neutral-400">
              Clutch #{clutch.clutch_number}
            </p>

            <div className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block text-sm text-neutral-400">
                  Hatchlings
                </label>

                <input
                  type="number"
                  min={0}
                  max={clutch.fertile}
                  value={count}
                  onChange={(e) =>
                    setCount(Number(e.target.value))
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-400">
                  Hatch Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3"
                />
              </div>

            </div>

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl bg-neutral-700 px-5 py-3 font-bold text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleHatch}
                disabled={saving}
                className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Hatching..." : "Hatch"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}