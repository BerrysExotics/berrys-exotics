import { GeckoWeight } from "@/lib/geckos/getWeightHistory";

interface Props {
  currentWeight: number | null;
  weights: GeckoWeight[];
}

export default function GrowthStats({
  currentWeight,
  weights,
}: Props) {
  const firstWeight =
    weights.length > 0
      ? weights[weights.length - 1].weight
      : null;

  const highestWeight =
    weights.length > 0
      ? Math.max(...weights.map((w) => Number(w.weight)))
      : currentWeight;

  const totalGain =
    firstWeight != null && currentWeight != null
      ? currentWeight - firstWeight
      : null;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
        <p className="text-sm uppercase tracking-wide text-neutral-400">
          Current Weight
        </p>

        <h2 className="mt-3 text-4xl font-black text-green-400">
          {currentWeight ?? "-"} g
        </h2>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
        <p className="text-sm uppercase tracking-wide text-neutral-400">
          Highest Weight
        </p>

        <h2 className="mt-3 text-4xl font-black text-blue-400">
          {highestWeight ?? "-"} g
        </h2>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
        <p className="text-sm uppercase tracking-wide text-neutral-400">
          Total Gain
        </p>

        <h2 className="mt-3 text-4xl font-black text-yellow-400">
          {totalGain != null
            ? `${totalGain.toFixed(1)} g`
            : "-"}
        </h2>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
        <p className="text-sm uppercase tracking-wide text-neutral-400">
          Weigh-ins
        </p>

        <h2 className="mt-3 text-4xl font-black text-purple-400">
          {weights.length}
        </h2>
      </div>

    </div>
  );
}