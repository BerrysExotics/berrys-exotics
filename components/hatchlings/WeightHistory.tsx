interface WeightEntry {
  id: number;
  weight: number;
  recorded_at: string;
  notes: string | null;
}

interface Props {
  weights: WeightEntry[];
}

export default function WeightHistory({
  weights,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          ⚖️ Weight History
        </h2>

        <span className="rounded-full bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-300">
          {weights.length} Entries
        </span>

      </div>

      {weights.length === 0 ? (

        <div className="mt-8 rounded-2xl border border-dashed border-neutral-700 p-10 text-center">

          <div className="text-5xl">
            ⚖️
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white">
            No Weights Recorded
          </h3>

          <p className="mt-2 text-neutral-400">
            Record the first weight to begin tracking growth.
          </p>

        </div>

      ) : (

        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-800">

          <table className="w-full">

            <thead className="bg-neutral-800">

              <tr>

                <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-neutral-400">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-neutral-400">
                  Weight
                </th>

                <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-neutral-400">
                  Notes
                </th>

              </tr>

            </thead>

            <tbody>

              {weights.map((entry) => (

                <tr
                  key={entry.id}
                  className="border-t border-neutral-800"
                >

                  <td className="px-6 py-4 text-white">
                    {new Date(
                      entry.recorded_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-bold text-green-400">
                    {entry.weight} g
                  </td>

                  <td className="px-6 py-4 text-neutral-400">
                    {entry.notes || "-"}
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