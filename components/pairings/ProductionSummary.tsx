interface Props {
  clutchCount: number;
  eggCount: number;
  fertileCount: number;
  hatchlingCount: number;
}

export default function ProductionSummary({
  clutchCount,
  eggCount,
  fertileCount,
  hatchlingCount,
}: Props) {
  const infertile = eggCount - fertileCount;

  const hatchRate =
    fertileCount > 0
      ? Math.round((hatchlingCount / fertileCount) * 100)
      : 0;

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="text-3xl font-black text-white">
        📈 Production Summary
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div>
          <p className="text-neutral-500">
            Clutches
          </p>

          <p className="mt-2 text-4xl font-black text-white">
            {clutchCount}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Eggs
          </p>

          <p className="mt-2 text-4xl font-black text-white">
            {eggCount}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Fertile
          </p>

          <p className="mt-2 text-4xl font-black text-green-400">
            {fertileCount}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Infertile
          </p>

          <p className="mt-2 text-4xl font-black text-red-400">
            {infertile}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Hatchlings
          </p>

          <p className="mt-2 text-4xl font-black text-yellow-400">
            {hatchlingCount}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Hatch Rate
          </p>

          <p className="mt-2 text-4xl font-black text-emerald-400">
            {hatchRate}%
          </p>
        </div>

      </div>

    </div>
  );
}