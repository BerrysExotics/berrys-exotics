import HatchlingToolbar from "@/components/hatchlings/HatchlingToolbar";
import HatchlingGrid from "@/components/hatchlings/HatchlingGrid";

import { getHatchlings } from "@/lib/hatchlings/getHatchlings";

export default async function HatchlingsPage() {
  const hatchlings = await getHatchlings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black text-white">
          Hatchlings
        </h1>

        <p className="mt-2 text-neutral-400">
          Manage hatchlings.
        </p>
      </div>

      <HatchlingToolbar
        hatchlingCount={hatchlings.length}
      />

      <HatchlingGrid
        hatchlings={hatchlings}
      />
    </div>
  );
}