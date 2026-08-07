"use client";

import { useState, useTransition } from "react";
import { addWeightAction } from "@/app/actions/weights";

interface Props {
  geckoId: string;
}

export default function AddWeightForm({
  geckoId,
}: Props) {
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const value = Number(weight);

    if (!value || value <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    startTransition(async () => {
      try {
        await addWeightAction(
          geckoId,
          value,
          notes
        );

        setWeight("");
        setNotes("");

        alert("Weight saved!");

        window.location.reload();
      } catch (err) {
        console.error(err);
        alert("Unable to save weight.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-neutral-700 bg-neutral-900 p-6"
    >
      <h3 className="text-xl font-bold text-white">
        ➕ Add Weight
      </h3>

      <div>
        <label className="mb-2 block font-semibold text-neutral-300">
          Weight (grams)
        </label>

        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value)
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white"
          placeholder="18.6"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-neutral-300">
          Notes (optional)
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          rows={3}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white"
          placeholder="Weekly weigh-in..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Weight"}
      </button>
    </form>
  );
}