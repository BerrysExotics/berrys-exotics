import Link from "next/link";

import { getIncubatorDashboard } from "@/lib/incubator/getIncubatorDashboard";
import IncubationProgress from "@/components/incubator/IncubationProgress";

export default async function IncubatorPage() {
  const { eggs, stats } =
    await getIncubatorDashboard();

  return (
    <main className="min-h-screen bg-neutral-900 pt-36 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-5xl font-black">
              🥚 Incubator Dashboard
            </h1>

            <p className="mt-2 text-lg text-neutral-400">
              Track every incubating egg.
            </p>
          </div>

          <Link
            href="/Admin/clutches"
            className="rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-700"
          >
            🥚 View Clutches
          </Link>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Active Eggs"
            value={stats.active}
            color="text-green-400"
          />

          <StatCard
            title="Eggs"
            value={stats.eggs}
            color="text-amber-400"
          />

          <StatCard
            title="Due This Week"
            value={stats.dueThisWeek}
            color="text-red-400"
          />

          <StatCard
            title="Hatched"
            value={stats.hatchedThisWeek}
            color="text-cyan-400"
          />

        </div>

        <section className="mt-12 space-y-8">

          {eggs.map((egg: any) => (

            <div
              key={egg.id}
              className="rounded-3xl border border-neutral-800 bg-neutral-800 p-8"
            >

              <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

                <div className="flex-1">

                  <h2 className="text-3xl font-black">
                    Group {egg.clutch?.pairing?.group_letter ?? "-"}
                  </h2>

                  <p className="mt-2 text-neutral-400">
                    {egg.clutch?.pairing?.pairing_name}
                  </p>

                  <p className="mt-1 text-neutral-400">
                    Clutch #{egg.clutch?.clutch_number}
                  </p>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <Info
                      label="Egg Number"
                      value={egg.egg_number}
                    />

                    <Info
                      label="Status"
                      value={egg.status}
                    />

                    <Info
                      label="Expected Hatch"
                      value={egg.expected_hatch_date}
                    />

                    <Info
                      label="Weight"
                      value={egg.weight ?? "-"}
                    />

                  </div>

                </div>

                <div className="w-full max-w-md">

                  <IncubationProgress
                    laidDate={egg.clutch?.laid_date}
                    expectedHatchDate={egg.expected_hatch_date}
                  />

                </div>

              </div>

            </div>

          ))}

          {eggs.length === 0 && (

            <div className="rounded-3xl border border-dashed border-neutral-700 p-16 text-center text-neutral-500">

              <div className="text-7xl">
                🥚
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                No Eggs Incubating
              </h2>

              <p className="mt-3">
                Eggs will appear here automatically after a clutch is created.
              </p>

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
      <p className="text-sm uppercase tracking-wide text-neutral-400">
        {title}
      </p>

      <h2 className={`mt-3 text-5xl font-black ${color}`}>
        {value}
      </h2>
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
    <div>
      <p className="text-sm text-neutral-400">
        {label}
      </p>

      <p className="text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}