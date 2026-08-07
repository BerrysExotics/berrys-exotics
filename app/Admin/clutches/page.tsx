import ClutchToolbar from "@/components/clutches/ClutchToolbar";
import ClutchGrid from "@/components/clutches/ClutchGrid";

import { getClutches } from "@/lib/clutches/getClutches";

export default async function ClutchesPage() {
  const clutches = await getClutches();

  return (
    <div className="space-y-10">

      <div className="space-y-4">

        <p className="font-semibold uppercase tracking-[0.35em] text-emerald-400">
          Breeding Management
        </p>

        <h1 className="text-5xl font-black text-white">
          Clutches
        </h1>

        <p className="max-w-3xl text-lg text-neutral-400">
          Record and manage every clutch produced by your breeding groups.
          Track females, egg counts, fertility, incubation progress,
          and hatch success from one place.
        </p>

      </div>

      <ClutchToolbar
        clutchCount={clutches.length}
      />

      <ClutchGrid
        clutches={clutches}
      />

    </div>
  );
}