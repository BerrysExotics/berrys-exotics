"use client";

import { ClutchFormData } from "@/types/clutchForm";

interface Props {
  form: ClutchFormData;
  setForm: React.Dispatch<React.SetStateAction<ClutchFormData>>;
}

export default function ClutchNotes({
  form,
  setForm,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Notes
      </h2>

      <textarea
        rows={6}
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
      />

    </div>
  );
}