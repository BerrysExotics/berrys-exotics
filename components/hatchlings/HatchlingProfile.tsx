import Link from "next/link";

import MoveToInventoryButton from "@/components/hatchlings/MoveToInventoryButton";

interface Props {
  hatchling: any;
}

export default function HatchlingProfile({
  hatchling,
}: Props) {
  const pairing = hatchling.clutch?.pairing;

  const females =
    pairing?.pairing_females?.map(
      (pf: any) => pf.female
    ) ?? [];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

          <div>

            <h1 className="text-5xl font-black text-white">
              {hatchling.name ||
                `Hatchling #${hatchling.hatchling_number}`}
            </h1>

            <p className="mt-3 text-neutral-400">
              {pairing?.pairing_name ?? "Unknown Pairing"}
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <span className="rounded-full bg-green-600 px-4 py-2 font-bold text-white">
              {hatchling.status}
            </span>

            <span className="rounded-full bg-blue-600 px-4 py-2 font-bold text-white">
              {hatchling.sex || "Unknown"}
            </span>

            <span className="rounded-full bg-purple-600 px-4 py-2 font-bold text-white">
              {hatchling.morph || "Unknown"}
            </span>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Left */}

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

          <h2 className="mb-6 text-2xl font-black text-white">
            Hatchling Information
          </h2>

          <Info
            label="Group"
            value={pairing?.group_letter ?? "-"}
          />

          <Info
            label="Clutch"
            value={`#${hatchling.clutch?.clutch_number ?? "-"}`}
          />

          <Info
            label="Hatch Date"
            value={
              hatchling.hatch_date
                ? new Date(
                    hatchling.hatch_date
                  ).toLocaleDateString()
                : "-"
            }
          />

          <Info
            label="Weight"
            value={`${hatchling.weight ?? 0} g`}
          />

        </div>

        {/* Parents */}

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

          <h2 className="mb-6 text-2xl font-black text-white">
            Parents
          </h2>

          <div className="rounded-xl bg-neutral-800 p-4">

            <p className="text-sm uppercase tracking-wide text-blue-400">
              Sire
            </p>

            <p className="mt-2 text-xl font-bold text-white">
              {pairing?.male?.name ?? "-"}
            </p>

          </div>

          <div className="mt-6">

            <p className="mb-3 text-sm uppercase tracking-wide text-pink-400">
              Dams
            </p>

            {females.length === 0 ? (
              <p className="text-neutral-500">
                No females assigned.
              </p>
            ) : (
              <div className="space-y-3">

                {females.map((female: any) => (
                  <div
                    key={female.id}
                    className="rounded-xl bg-neutral-800 p-4"
                  >
                    <p className="font-bold text-white">
                      {female.name}
                    </p>

                    <p className="text-neutral-400">
                      {female.morph}
                    </p>
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Notes */}

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

        <h2 className="mb-4 text-2xl font-black text-white">
          Notes
        </h2>

        <p className="whitespace-pre-wrap text-neutral-400">
          {hatchling.notes || "No notes yet."}
        </p>

      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4">

        <Link
          href={`/Admin/hatchlings/edit/${hatchling.id}`}
          className="rounded-xl bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
        >
          ✏ Edit Hatchling
        </Link>

        <Link
          href={`/Admin/hatchlings/${hatchling.id}/gallery`}
          className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          📷 Gallery
        </Link>

        <MoveToInventoryButton
          hatchlingId={hatchling.id}
          transferred={hatchling.transferred}
        />

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="mb-5">

      <p className="text-sm uppercase tracking-wide text-neutral-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-white">
        {value}
      </p>

    </div>
  );
}