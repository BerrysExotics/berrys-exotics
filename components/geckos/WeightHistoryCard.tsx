import { GeckoWeight } from "@/lib/geckos/getWeightHistory";
import AddWeightForm from "@/components/geckos/AddWeightForm";

interface Props {
  geckoId: string;
  currentWeight: number | null;
  weights: GeckoWeight[];
}

export default function WeightHistoryCard({
  geckoId,
  currentWeight,
  weights,
}: Props) {
  const latestWeight = weights[0];

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        ⚖ Weight History
      </h2>

      <div className="mb-8 grid gap-6 md:grid-cols-2">

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Current Weight
          </h3>

          <p className="mt-2 text-4xl font-black text-green-400">
            {currentWeight ?? "-"} g
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Last Weighed
          </h3>

          <p className="mt-2 text-xl text-white">
            {latestWeight
              ? new Date(
                  latestWeight.recorded_at
                ).toLocaleDateString()
              : "Never"}
          </p>
        </div>

      </div>

      <div className="mb-8">
        <AddWeightForm geckoId={geckoId} />
      </div>

      {weights.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
          No weights have been recorded yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-700">

          <table className="w-full">

            <thead className="bg-neutral-900">

              <tr>
                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-left">
                  Weight
                </th>

                <th className="px-4 py-3 text-left">
                  Notes
                </th>
              </tr>

            </thead>

            <tbody>

              {weights.map((weight) => (
                <tr
                  key={weight.id}
                  className="border-t border-neutral-700"
                >
                  <td className="px-4 py-3">
                    {new Date(
                      weight.recorded_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 font-bold text-green-400">
                    {weight.weight} g
                  </td>

                  <td className="px-4 py-3 text-neutral-400">
                    {weight.notes || "-"}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}