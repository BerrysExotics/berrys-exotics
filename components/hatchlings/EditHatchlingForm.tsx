"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getHatchlingForEdit } from "@/lib/hatchlings/getHatchlingForEdit";
import { updateHatchling } from "@/lib/hatchlings/updateHatchling";

interface Props {
  hatchlingId: number;
}

export default function EditHatchlingForm({
  hatchlingId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    morph: "",
    sex: "",
    weight: "",
    hatch_date: "",
    status: "Growing",
    notes: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const hatchling =
          await getHatchlingForEdit(hatchlingId);

        setForm({
          name: hatchling.name ?? "",
          morph: hatchling.morph ?? "",
          sex: hatchling.sex ?? "",
          weight:
            hatchling.weight?.toString() ?? "",
          hatch_date:
            hatchling.hatch_date ?? "",
          status:
            hatchling.status ?? "Growing",
          notes:
            hatchling.notes ?? "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load hatchling.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [hatchlingId]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      await updateHatchling(hatchlingId, {
        name: form.name,
        morph: form.morph,
        sex: form.sex,
        weight:
          form.weight === ""
            ? null
            : Number(form.weight),
        hatch_date: form.hatch_date,
        status: form.status,
        notes: form.notes,
      });

      alert("Hatchling updated!");

      router.push(`/Admin/hatchlings/${hatchlingId}`);
      router.refresh();

    } catch (err) {
      console.error(err);
      alert("Failed to update hatchling.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-neutral-900 p-10 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Hatchling Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <Input
            label="Name"
            value={form.name}
            onChange={(value) =>
              setForm({
                ...form,
                name: value,
              })
            }
          />

          <Input
            label="Morph"
            value={form.morph}
            onChange={(value) =>
              setForm({
                ...form,
                morph: value,
              })
            }
          />

          <Input
            label="Weight (g)"
            type="number"
            value={form.weight}
            onChange={(value) =>
              setForm({
                ...form,
                weight: value,
              })
            }
          />

          <Input
            label="Hatch Date"
            type="date"
            value={form.hatch_date}
            onChange={(value) =>
              setForm({
                ...form,
                hatch_date: value,
              })
            }
          />

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
              <option value="">
                Unknown
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Probable Male">
                Probable Male
              </option>

              <option value="Probable Female">
                Probable Female
              </option>
            </select>
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
                  status: e.target.value,
                })
              }
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
            >
              <option>
                Growing
              </option>

              <option>
                Holdback
              </option>

              <option>
                Available
              </option>

              <option>
                Reserved
              </option>

              <option>
                Sold
              </option>
            </select>
          </div>

        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm text-neutral-300">
            Notes
          </label>

          <textarea
            rows={6}
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
          />
        </div>

      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-700"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>

    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-neutral-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3"
      />
    </div>
  );
}