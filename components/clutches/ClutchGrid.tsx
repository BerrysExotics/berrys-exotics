import ClutchCard from "./ClutchCard";

interface Props {
  clutches: any[];
}

export default function ClutchGrid({
  clutches,
}: Props) {
  if (clutches.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-700 bg-neutral-900 p-16 text-center shadow-xl">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-neutral-800 text-5xl">
          🥚
        </div>

        <h2 className="mt-8 text-3xl font-black text-white">
          No Clutches Recorded
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-neutral-400">
          Once a female lays eggs, record the clutch here to begin tracking
          incubation, hatch dates, hatchlings, and production history.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      {clutches.map((clutch) => (
        <ClutchCard
          key={clutch.id}
          clutch={clutch}
        />
      ))}
    </div>
  );
}