"use client";

import ParentSelector from "@/components/forms/ParentSelector";

import { GeckoFormData } from "@/types/geckoForm";
import { ParentOption } from "@/lib/geckos/getParentOptions";

interface Props {
  form: GeckoFormData;
  setForm: React.Dispatch<
    React.SetStateAction<GeckoFormData>
  >;

  parents: ParentOption[];
}

export default function BreedingSection({
  form,
  setForm,
  parents,
}: Props) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Breeding Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold text-white">
            Produced By
          </label>

          <input
            name="produced_by"
            value={form.produced_by}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-white">
            Original Breeder
          </label>

          <input
            name="breeder"
            value={form.breeder}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-white">
            Lineage
          </label>

          <input
            name="lineage"
            value={form.lineage}
            onChange={handleChange}
            placeholder="Example: GT x Moro"
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        <ParentSelector
          label="Sire"
          sex="Male"
          parents={parents}
          value={form.sire_id}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              sire_id: value,
            }))
          }
        />

        <ParentSelector
          label="Dam"
          sex="Female"
          parents={parents}
          value={form.dam_id}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              dam_id: value,
            }))
          }
        />

      </div>

    </div>
  );
}