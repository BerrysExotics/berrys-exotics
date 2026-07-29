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
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Pricing & Availability
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold text-white">
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
          <label className="block mb-2 font-semibold text-white">
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

        <div>
          <label className="block mb-2 font-semibold text-white">
            Availability
          </label>

          <select
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          >
            <option>Available</option>
            <option>Reserved</option>
            <option>Holdback</option>
            <option>Sold</option>
            <option>Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          >
            <option>Available</option>
            <option>Reserved</option>
            <option>Hold</option>
            <option>Sold</option>
            <option>Retained</option>
          </select>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
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
  );
}