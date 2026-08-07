import Link from "next/link";

interface DashboardStats {
  weightsDue: number;
  photosDue: number;
  activeClutches: number;
  hatchlings: number;
  available: number;
  inquiries: number;
}

interface Props {
  stats: DashboardStats;
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-5">
      <div className="text-3xl">{icon}</div>

      <p className="mt-3 text-sm uppercase tracking-wide text-neutral-400">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-black text-green-400">
        {value}
      </h2>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
}: {
  href: string;
  icon: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-800 p-5 transition hover:bg-neutral-700"
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>

        <span className="text-lg font-bold">
          {title}
        </span>
      </div>

      <span className="text-neutral-400">
        →
      </span>
    </Link>
  );
}

export default function MobileDashboard({
  stats,
}: Props) {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          🦎 Berrys_Exotics
        </h1>

        <p className="mt-2 text-neutral-400">
          Your breeder command center.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          title="Weights Due"
          value={stats.weightsDue}
          icon="⚖️"
        />

        <StatCard
          title="Photos Due"
          value={stats.photosDue}
          icon="📷"
        />

        <StatCard
          title="Clutches"
          value={stats.activeClutches}
          icon="🥚"
        />

        <StatCard
          title="Hatchlings"
          value={stats.hatchlings}
          icon="🐣"
        />

        <StatCard
          title="Available"
          value={stats.available}
          icon="🦎"
        />

        <StatCard
          title="Inquiries"
          value={stats.inquiries}
          icon="💬"
        />

      </div>

      <div className="space-y-3">

        <QuickAction
          href="/Admin/inventory"
          icon="⚖️"
          title="Record Weights"
        />

        <QuickAction
          href="/Admin/inventory"
          icon="📷"
          title="Upload Photos"
        />

        <QuickAction
          href="/Admin/inventory"
          icon="🦎"
          title="Inventory"
        />

        <QuickAction
          href="/Admin/incubator"
          icon="🥚"
          title="Incubator"
        />

        <QuickAction
          href="/Admin/hatchlings"
          icon="🐣"
          title="Hatchlings"
        />

        <QuickAction
          href="/Admin/breeders"
          icon="👨‍👩‍👧"
          title="Breeders"
        />

        <QuickAction
          href="/Admin/inquiries"
          icon="💬"
          title="Customer Inquiries"
        />

      </div>

    </div>
  );
}