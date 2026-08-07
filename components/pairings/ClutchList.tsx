import Link from "next/link";

interface Clutch {
  id: number;
  clutch_number: number;
  laid_date: string | null;
  eggs: number | null;
  fertile: number | null;
  status: string;
}

interface Props {
  pairingId: number;
  clutches: Clutch[];
}

export default function ClutchList({
  pairingId,
  clutches,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          🥚 Clutches
        </h2>

        <Link
          href={`/Admin/clutches/add?pairing=${pairingId}`}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          + New Clutch
        </Link>

      </div>

      {clutches.length === 0 ? (

        <div className="py-16 text-center">

          <p className="text-lg text-neutral-400">
            No clutches have been created yet.
          </p>

        </div>

      ) : (

        <div className="mt-8 space-y-5">

          {clutches.map((clutch) => (

            <div
              key={clutch.id}
              className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6 transition hover:border-emerald-500"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h3 className="text-2xl font-black text-white">
                    Clutch #{clutch.clutch_number}
                  </h3>

                  <p className="mt-2 text-neutral-400">
                    {clutch.laid_date
                      ? new Date(
                          clutch.laid_date
                        ).toLocaleDateString()
                      : "No lay date"}
                  </p>

                </div>

                <span className="rounded-full bg-emerald-600 px-5 py-2 font-bold text-white">
                  {clutch.status}
                </span>

              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <div>

                  <p className="text-neutral-500">
                    Eggs
                  </p>

                  <p className="mt-2 text-3xl font-black text-white">
                    {clutch.eggs ?? 0}
                  </p>

                </div>

                <div>

                  <p className="text-neutral-500">
                    Fertile
                  </p>

                  <p className="mt-2 text-3xl font-black text-green-400">
                    {clutch.fertile ?? 0}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}