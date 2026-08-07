"use client";

import { BreederFormData } from "@/types/breederForm";

interface Props {
  form: BreederFormData;
  setForm: React.Dispatch<React.SetStateAction<BreederFormData>>;
}

export default function NotesSection({
  form,
  setForm,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Notes
      </h2>

      <textarea
        rows={6}
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
        placeholder="Additional notes..."
      />
    </div>
  );
}