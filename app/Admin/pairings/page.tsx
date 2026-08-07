import PairingToolbar from "@/components/pairings/PairingToolbar";
import PairingGrid from "@/components/pairings/PairingGrid";

import { getPairings } from "@/lib/pairings/getPairings";

export default async function BreedingGroupsPage() {
  const pairings = await getPairings();

  return (
    <div className="space-y-8">

      <div>

        <p className="font-semibold uppercase tracking-[0.35em] text-emerald-400">
          Breeding Management
        </p>

        <h1 className="text-5xl font-black text-white">
          🦎 Breeding Groups
        </h1>

        <p className="mt-3 max-w-3xl text-lg text-neutral-400">
          Manage breeding groups, monitor production, and track every
          clutch, egg, and hatchling from a single dashboard.
        </p>

      </div>

      <PairingToolbar
        pairingCount={pairings.length}
      />

      <PairingGrid
        pairings={pairings}
      />

    </div>
  );
}