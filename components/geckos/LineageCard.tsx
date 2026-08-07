interface Props {
  hatchling: {
    hatchling_number?: number | null;
    hatch_date?: string | null;
    clutch?: {
      clutch_number?: number | null;
      pairing?: {
        pairing_name?: string | null;
        male?: {
          name?: string | null;
        } | null;
        female?: {
          name?: string | null;
        } | null;
      } | null;
    } | null;
  } | null;
}

export default function LineageCard({
  hatchling,
}: Props) {
  if (!hatchling) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
        <h2 className="text-2xl font-bold text-white">
          🧬 Lineage
        </h2>

        <p className="mt-4 text-neutral-400">
          No lineage information available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        🧬 Lineage
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <h3 className="font-semibold text-neutral-400">
            Sire
          </h3>

          <p className="text-lg text-white">
            {hatchling.clutch?.pairing?.male?.name ?? "-"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Dam
          </h3>

          <p className="text-lg text-white">
            {hatchling.clutch?.pairing?.female?.name ?? "-"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Pairing
          </h3>

          <p className="text-lg text-white">
            {hatchling.clutch?.pairing?.pairing_name ?? "-"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Clutch
          </h3>

          <p className="text-lg text-white">
            #{hatchling.clutch?.clutch_number ?? "-"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Hatchling
          </h3>

          <p className="text-lg text-white">
            #{hatchling.hatchling_number ?? "-"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Hatch Date
          </h3>

          <p className="text-lg text-white">
            {hatchling.hatch_date ?? "-"}
          </p>
        </div>

      </div>

    </div>
  );
}