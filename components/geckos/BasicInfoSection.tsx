"use client";

import { GeckoFormData } from "@/types/geckoForm";

interface Props {
  form: GeckoFormData;
  setForm: React.Dispatch<React.SetStateAction<GeckoFormData>>;
}

export default function BasicInfoSection({
  form,
  setForm,
}: Props) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        Basic Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold text-white">
            Gecko Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Nickname
          </label>

          <input
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Species
          </label>

          <select
            name="species"
            value={form.species}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          >
            <option>Crested Gecko</option>
            <option>Leachianus</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Morph
          </label>

          <input
            name="morph"
            value={form.morph}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Sex
          </label>

          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          >
            <option>Unknown</option>
            <option>Male</option>
            <option>Female</option>
            <option>Probable Male</option>
            <option>Probable Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Weight (g)
          </label>

          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-white">
            Hatch Date
          </label>

          <input
            type="date"
            name="hatch_date"
            value={form.hatch_date}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

      </div>

    </div>
  );
}