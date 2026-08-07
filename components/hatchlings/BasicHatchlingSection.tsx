"use client";

import { HatchlingFormData } from "@/types/hatchlingForm";

interface Clutch {
  id: number;
  clutch_number: number;
  pairing: {
    pairing_name: string;
  };
}

interface Props {
  form: HatchlingFormData;
  setForm: React.Dispatch<
    React.SetStateAction<HatchlingFormData>
  >;

  clutches: Clutch[];
}

export default function BasicHatchlingSection({
  form,
  setForm,
  clutches,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Hatchling Information
      </h2>

      <div>
        <label className="mb-2 block text-sm text-neutral-300">
          Clutch
        </label>

        <select
          value={form.clutch_id}
          onChange={(e) =>
            setForm({
              ...form,
              clutch_id:
                e.target.value === ""
                  ? ""
                  : Number(e.target.value),
            })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        >
          <option value="">Select Clutch</option>

          {clutches.map((clutch) => (
            <option
              key={clutch.id}
              value={clutch.id}
            >
              {clutch.pairing.pairing_name} • Clutch #{clutch.clutch_number}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Hatchling #
          </label>

          <input
            type="number"
            value={form.hatchling_number}
            onChange={(e) =>
              setForm({
                ...form,
                hatchling_number: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

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
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

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
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
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
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          >
            <option>Unknown</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Hatch Date
          </label>

          <input
            type="date"
            value={form.hatch_date}
            onChange={(e) =>
              setForm({
                ...form,
                hatch_date: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Weight (g)
          </label>

          <input
            type="number"
            value={form.weight}
            onChange={(e) =>
              setForm({
                ...form,
                weight: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Status
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as HatchlingFormData["status"],
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          >
            <option>Growing</option>
            <option>Holdback</option>
            <option>Available</option>
            <option>Sold</option>
          </select>
        </div>

      </div>

    </div>
  );
}