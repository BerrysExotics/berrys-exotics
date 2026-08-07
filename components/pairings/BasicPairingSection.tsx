"use client";

import { PairingFormData } from "@/types/pairingForm";

interface Breeder {
  id: number;
  name: string;
}

interface Props {
  form: PairingFormData;
  setForm: React.Dispatch<React.SetStateAction<PairingFormData>>;

  males: Breeder[];
  females: Breeder[];
}

export default function BasicPairingSection({
  form,
  setForm,
  males,
  females,
}: Props) {
  function addFemale(id: number) {
    if (!id) return;

    if (form.female_ids.includes(id)) return;

    setForm({
      ...form,
      female_ids: [...form.female_ids, id],
    });
  }

  function removeFemale(id: number) {
    setForm({
      ...form,
      female_ids: form.female_ids.filter((f) => f !== id),
    });
  }

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <h2 className="text-2xl font-bold text-white">
        Pair Information
      </h2>

      <div>
        <label className="mb-2 block text-sm text-neutral-300">
          Pair Name
        </label>

        <input
          value={form.pairing_name}
          onChange={(e) =>
            setForm({
              ...form,
              pairing_name: e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-neutral-300">
          Male
        </label>

        <select
          value={form.male_id}
          onChange={(e) =>
            setForm({
              ...form,
              male_id:
                e.target.value === ""
                  ? ""
                  : Number(e.target.value),
            })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        >
          <option value="">Select Male</option>

          {males.map((male) => (
            <option
              key={male.id}
              value={male.id}
            >
              {male.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-neutral-300">
          Add Female
        </label>

        <select
          value=""
          onChange={(e) => {
            if (!e.target.value) return;

            addFemale(Number(e.target.value));
          }}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        >
          <option value="">
            Select Female...
          </option>

          {females
            .filter(
              (female) =>
                !form.female_ids.includes(female.id)
            )
            .map((female) => (
              <option
                key={female.id}
                value={female.id}
              >
                {female.name}
              </option>
            ))}
        </select>
      </div>

      <div>

        <div className="mb-2 flex items-center justify-between">

          <label className="text-sm text-neutral-300">
            Selected Females
          </label>

          <span className="text-sm text-emerald-400">
            {form.female_ids.length} selected
          </span>

        </div>

        <div className="space-y-2 rounded-xl border border-neutral-700 bg-neutral-950 p-4">

          {form.female_ids.length === 0 ? (

            <p className="text-sm text-neutral-500">
              No females selected.
            </p>

          ) : (

            form.female_ids.map((id) => {

              const female = females.find(
                (f) => f.id === id
              );

              return (

                <div
                  key={id}
                  className="flex items-center justify-between rounded-lg bg-neutral-800 px-4 py-3"
                >
                  <span>
                    {female?.name}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeFemale(id)
                    }
                    className="rounded-lg bg-red-600 px-3 py-1 text-sm font-semibold transition hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>

              );
            })

          )}

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
              status: e.target.value as
                | "Active"
                | "Paused"
                | "Retired",
            })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
        >
          <option>Active</option>
          <option>Paused</option>
          <option>Retired</option>
        </select>
      </div>

    </div>
  );
}