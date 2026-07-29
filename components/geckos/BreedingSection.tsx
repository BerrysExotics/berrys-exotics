"use client";

import { GeckoFormData } from "@/types/geckoForm";

interface Props {
  form: GeckoFormData;
  setForm: React.Dispatch<React.SetStateAction<GeckoFormData>>;
}

export default function BreedingSection({
  form,
  setForm,
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
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Breeding Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold text-white">
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
          <label className="block mb-2 font-semibold text-white">
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
          <label className="block mb-2 font-semibold text-white">
            Lineage
          </label>

          <input
            name="lineage"
            value={form.lineage}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
            placeholder="Example: GT x Moro"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Sire ID
          </label>

          <input
            name="sire_id"
            value={form.sire_id}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
            placeholder="Parent selector coming next"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Dam ID
          </label>

          <input
            name="dam_id"
            value={form.dam_id}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
            placeholder="Parent selector coming next"
          />
        </div>

      </div>

    </div>
  );
}