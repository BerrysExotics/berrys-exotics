import Link from "next/link";

interface DashboardStats {
  totalGeckos: number;
  available: number;
  inquiries: number;
  hatchlings: number;
  activeClutches: number;
  dueThisWeek: number;
  weightsDue: number;
  photosDue: number;
}

interface Props {
  stats: DashboardStats;
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-green-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-neutral-400">
            {title}
          </p>

          <h2 className={`mt-3 text-5xl font-black ${color}`}>
            {value}
          </h2>
        </div>

        <div className="text-5xl">{icon}</div>
      </div>
    </div>
  );
}

export default function AdminOverview({
  stats,
}: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-black">
          Dashboard Overview
        </h2>

        <p className="mt-2 text-neutral-400">
          Everything happening in your collection today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Total Geckos"
          value={stats.totalGeckos}
          icon="🦎"
          color="text-emerald-400"
        />

        <Card
          title="Available"
          value={stats.available}
          icon="💰"
          color="text-green-400"
        />

        <Card
          title="Hatchlings"
          value={stats.hatchlings}
          icon="🐣"
          color="text-yellow-400"
        />

        <Card
          title="Active Clutches"
          value={stats.activeClutches}
          icon="🥚"
          color="text-orange-400"
        />

        <Card
          title="Due This Week"
          value={stats.dueThisWeek}
          icon="🔥"
          color="text-red-400"
        />

        <Card
          title="Weights Due"
          value={stats.weightsDue}
          icon="⚖️"
          color="text-cyan-400"
        />

        <Card
          title="Photos Needed"
          value={stats.photosDue}
          icon="📷"
          color="text-purple-400"
        />

        <Card
          title="Inquiries"
          value={stats.inquiries}
          icon="💬"
          color="text-sky-400"
        />
      </div>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
        <h2 className="text-3xl font-bold">
          Quick Actions
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/Admin/inventory/add"
            className="rounded-xl bg-green-600 px-6 py-4 text-center font-bold hover:bg-green-700"
          >
            ➕ Add Gecko
          </Link>

          <Link
            href="/Admin/inventory"
            className="rounded-xl bg-blue-600 px-6 py-4 text-center font-bold hover:bg-blue-700"
          >
            🦎 Inventory
          </Link>

          <Link
            href="/Admin/incubator"
            className="rounded-xl bg-orange-600 px-6 py-4 text-center font-bold hover:bg-orange-700"
          >
            🥚 Incubator
          </Link>

          <Link
            href="/Admin/hatchlings"
            className="rounded-xl bg-purple-600 px-6 py-4 text-center font-bold hover:bg-purple-700"
          >
            🐣 Hatchlings
          </Link>
        </div>
      </div>
    </div>
  );
}