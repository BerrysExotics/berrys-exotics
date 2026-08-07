interface Props {
  clutchCount: number;
  eggCount: number;
  hatchlingCount: number;
  successRate: string;
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">

      <p className="text-neutral-400">
        {label}
      </p>

      <p className={`mt-3 text-5xl font-black ${color}`}>
        {value}
      </p>

    </div>
  );
}

export default function PairingStats({
  clutchCount,
  eggCount,
  hatchlingCount,
  successRate,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-4">

      <StatCard
        label="Clutches"
        value={clutchCount}
        color="text-white"
      />

      <StatCard
        label="Eggs"
        value={eggCount}
        color="text-white"
      />

      <StatCard
        label="Hatchlings"
        value={hatchlingCount}
        color="text-yellow-400"
      />

      <StatCard
        label="Success"
        value={successRate}
        color="text-green-400"
      />

    </div>
  );
}