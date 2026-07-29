"use client";

import { GeckoFormData } from "@/types/geckoForm";

interface Props {
  form: GeckoFormData;
  setForm: React.Dispatch<React.SetStateAction<GeckoFormData>>;
}

export default function NotesSection({
  form,
  setForm,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Notes
      </h2>

      <div>
        <label className="block mb-2 font-semibold text-white">
          Public Description
        </label>

        <textarea
          rows={6}
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          placeholder="Describe this gecko..."
        />
      </div>

    </div>
  );
}