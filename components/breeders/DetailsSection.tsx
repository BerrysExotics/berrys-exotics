"use client";

import { BreederFormData } from "@/types/breederForm";

interface Props {
  form: BreederFormData;
  setForm: React.Dispatch<React.SetStateAction<BreederFormData>>;
}

export default function DetailsSection({
  form,
  setForm,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Status
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as
                  | "Active"
                  | "Retired"
                  | "Archived",
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
          >
            <option>Active</option>
            <option>Retired</option>
            <option>Archived</option>
          </select>
        </div>

      </div>
    </div>
  );
}