"use client";

import { GeckoFormData } from "@/types/geckoForm";

interface Props {
  form: GeckoFormData;
  setForm: React.Dispatch<React.SetStateAction<GeckoFormData>>;
}

export default function PricingSection({
  form,
  setForm,
}: Props) {
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-8">

      <h2 className="text-2xl font-bold text-white">
        Collection & Sales
      </h2>

      {/* Pricing */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-emerald-400">
          Pricing
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-semibold text-white">
              Price ($)
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-xl bg-neutral-800 p-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-white">
              Deposit ($)
            </label>

            <input
              type="number"
              name="deposit"
              value={form.deposit}
              onChange={handleChange}
              className="w-full rounded-xl bg-neutral-800 p-4 text-white"
            />
          </div>

        </div>

      </div>

      {/* Collection */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-emerald-400">
          Collection Status
        </h3>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl bg-neutral-800 p-4 text-white"
        >
          <option>Collection</option>
          <option>Holdback</option>
          <option>Breeder</option>
          <option>Retired</option>
        </select>

      </div>

      {/* Sales */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-emerald-400">
          Sales Status
        </h3>

        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          className="w-full rounded-xl bg-neutral-800 p-4 text-white"
        >
          <option>Available</option>
          <option>On Hold</option>
          <option>Sold</option>
          <option>Not For Sale</option>
        </select>

      </div>

      {/* Website */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold text-emerald-400">
          Website
        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured Listing
          </label>

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="listed"
              checked={form.listed}
              onChange={handleChange}
            />
            Listed on Website
          </label>

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="pet_only"
              checked={form.pet_only}
              onChange={handleChange}
            />
            Pet Only
          </label>

        </div>

      </div>

    </div>
  );
}