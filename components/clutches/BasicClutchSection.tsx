"use client";

import { ClutchFormData } from "@/types/clutchForm";

interface Pairing {
  id: number;
  pairing_name: string;
}

interface Props {
  form: ClutchFormData;
  setForm: React.Dispatch<React.SetStateAction<ClutchFormData>>;
  pairings: Pairing[];
}

export default function BasicClutchSection({
  form,
  setForm,
  pairings,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Clutch Information
      </h2>

      <div>
        <label className="mb-2 block text-sm text-neutral-300">
          Pairing
        </label>

        <select
          value={form.pairing_id}
          onChange={(e) =>
            setForm({
              ...form,
              pairing_id:
                e.target.value === ""
                  ? ""
                  : Number(e.target.value),
            })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        >
          <option value="">Select Pairing</option>

          {pairings.map((pairing) => (
            <option
              key={pairing.id}
              value={pairing.id}
            >
              {pairing.pairing_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Clutch Number
          </label>

          <input
            type="number"
            value={form.clutch_number}
            onChange={(e) =>
              setForm({
                ...form,
                clutch_number: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Eggs
          </label>

          <input
            type="number"
            value={form.eggs}
            onChange={(e) =>
              setForm({
                ...form,
                eggs: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Fertile Eggs
          </label>

          <input
            type="number"
            value={form.fertile}
            onChange={(e) =>
              setForm({
                ...form,
                fertile: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Incubator
          </label>

          <input
            type="text"
            value={form.incubator}
            onChange={(e) =>
              setForm({
                ...form,
                incubator: e.target.value,
              })
            }
            placeholder="Example: Incubator A"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Laid Date
          </label>

          <input
            type="date"
            value={form.laid_date}
            onChange={(e) =>
              setForm({
                ...form,
                laid_date: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Expected Hatch
          </label>

          <input
            type="date"
            value={form.expected_hatch}
            onChange={(e) =>
              setForm({
                ...form,
                expected_hatch: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

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
              status: e.target.value as ClutchFormData["status"],
            })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        >
          <option value="Incubating">Incubating</option>
          <option value="Hatched">Hatched</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

    </div>
  );
}