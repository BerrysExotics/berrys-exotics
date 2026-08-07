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
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Basic Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Animal ID */}

        <div>
          <label className="mb-2 block font-semibold text-white">
            Animal ID
          </label>

          <input
            name="animal_id"
            value={form.animal_id ?? ""}
            onChange={handleChange}
            placeholder="A-01"
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />

          <p className="mt-2 text-sm text-neutral-400">
            Your internal ID (A-01, A-02, B-14, etc.)
          </p>
        </div>

        {/* Gecko Name */}

        <div>
          <label className="mb-2 block font-semibold text-white">
            Gecko Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        {/* Nickname */}

        <div>
          <label className="mb-2 block font-semibold text-white">
            Nickname
          </label>

          <input
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        {/* Species */}

        <div>
          <label className="mb-2 block font-semibold text-white">
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

        {/* Morph */}

        <div>
          <label className="mb-2 block font-semibold text-white">
            Morph
          </label>

          <input
            name="morph"
            value={form.morph}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-800 p-4 text-white"
          />
        </div>

        {/* Sex */}

        <div>
          <label className="mb-2 block font-semibold text-white">
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

        {/* Weight */}

        <div>
          <label className="mb-2 block font-semibold text-white">
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

        {/* Hatch Date */}

        <div>
          <label className="mb-2 block font-semibold text-white">
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