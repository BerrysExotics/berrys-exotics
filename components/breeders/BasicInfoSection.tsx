"use client";

import { BreederFormData } from "@/types/breederForm";

interface Props {
  form: BreederFormData;
  setForm: React.Dispatch<React.SetStateAction<BreederFormData>>;
}

export default function BasicInfoSection({
  form,
  setForm,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Basic Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Species
          </label>

          <select
            value={form.species}
            onChange={(e) =>
              setForm({
                ...form,
                species: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
          >
            <option>Crested Gecko</option>
            <option>Leachianus</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Morph
          </label>

          <input
            value={form.morph}
            onChange={(e) =>
              setForm({
                ...form,
                morph: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Sex
          </label>

          <select
            value={form.sex}
            onChange={(e) =>
              setForm({
                ...form,
                sex: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-white"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Unknown</option>
          </select>
        </div>

      </div>

    </div>
  );
}