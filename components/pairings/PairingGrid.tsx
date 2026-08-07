import PairingCard from "./PairingCard";

interface Props {
  pairings: any[];
  isPublic?: boolean;
}

export default function PairingGrid({
  pairings,
  isPublic = false,
}: Props) {
  if (pairings.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-700 bg-neutral-900 p-20 text-center">

        <div className="text-7xl">
          🦎
        </div>

        <h2 className="mt-6 text-3xl font-black text-white">
          No Breeding Groups Yet
        </h2>

        <p className="mt-4 text-lg text-neutral-400">
          Create your first breeding group to begin tracking clutches,
          eggs, hatchlings, and production.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      {pairings.map((pairing) => (
        <PairingCard
          key={pairing.id}
          pairing={pairing}
          isPublic={isPublic}
        />
      ))}
    </div>
  );
}