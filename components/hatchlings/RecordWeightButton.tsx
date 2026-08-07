"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Props {
  hatchlingId: number;
}

export default function RecordWeightButton({
  hatchlingId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [weight, setWeight] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [notes, setNotes] = useState("");

  async function saveWeight() {
    if (!weight) {
      alert("Please enter a weight.");
      return;
    }

    try {
      setSaving(true);

      // Save weight history
      const { error } = await supabase
        .from("hatchling_weights")
        .insert({
          hatchling_id: hatchlingId,
          weight: Number(weight),
          recorded_at: date,
          notes,
        });

      if (error) throw error;

      // Update current hatchling weight
      const { error: updateError } = await supabase
        .from("hatchlings")
        .update({
          weight: Number(weight),
        })
        .eq("id", hatchlingId);

      if (updateError) throw updateError;

      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Unable to record weight.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
      >
        ⚖️ Record Weight
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

          <div className="w-full max-w-lg rounded-3xl border border-neutral-700 bg-neutral-900 p-8">

            <h2 className="text-3xl font-black text-white">
              Record Weight
            </h2>

            <div className="mt-8 space-y-6">

              <div>
                <label className="mb-2 block text-sm text-neutral-400">
                  Weight (g)
                </label>

                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) =>
                    setWeight(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-400">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-400">
                  Notes (optional)
                </label>

                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-white"
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
                onClick={saveWeight}
                disabled={saving}
                className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Weight"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}