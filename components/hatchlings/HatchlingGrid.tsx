import HatchlingCard from "./HatchlingCard";

interface Props {
  hatchlings: any[];
}

export default function HatchlingGrid({
  hatchlings,
}: Props) {
  if (hatchlings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-700 p-16 text-center text-neutral-400">
        No hatchlings yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {hatchlings.map((hatchling) => (
        <HatchlingCard
          key={hatchling.id}
          hatchling={hatchling}
        />
      ))}
    </div>
  );
}