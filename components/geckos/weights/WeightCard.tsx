import { WeightQueueGecko } from "@/lib/geckos/getWeightQueue";

interface WeightCardProps {
  gecko: WeightQueueGecko;
}

export default function WeightCard({
  gecko,
}: WeightCardProps) {
  const change =
    gecko.previous_weight != null &&
    gecko.current_weight != null
      ? gecko.current_weight - gecko.previous_weight
      : null;

  const daysSince =
    gecko.last_recorded
      ? Math.floor(
          (Date.now() -
            new Date(gecko.last_recorded).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

  return (
    <div className="grid gap-8 md:grid-cols-2">

      <div>

        {gecko.coverImage ? (
          <img
            src={gecko.coverImage}
            alt={gecko.name}
            className="aspect-square w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-xl bg-neutral-800 text-8xl">
            🦎
          </div>
        )}

      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <h1 className="text-4xl font-black text-white">
            {gecko.name}
          </h1>

          <span className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white">
            {gecko.animal_id ?? "No ID"}
          </span>

        </div>

        {gecko.nickname && (
          <p className="text-green-400">
            "{gecko.nickname}"
          </p>
        )}

        <p className="text-lg text-neutral-300">
          {gecko.species}
        </p>

        <p className="text-white">
          {gecko.morph}
        </p>

        <p className="text-neutral-400">
          {gecko.sex}
        </p>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-neutral-800 p-4">

            <p className="text-sm text-neutral-400">
              Current Weight
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {gecko.current_weight ?? "--"} g
            </p>

          </div>

          <div className="rounded-xl bg-neutral-800 p-4">

            <p className="text-sm text-neutral-400">
              Previous Weight
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {gecko.previous_weight ?? "--"} g
            </p>

          </div>

        </div>

        <div className="rounded-xl bg-neutral-800 p-4">

          <p className="text-sm text-neutral-400">
            Weight Change
          </p>

          {change == null ? (
            <p className="mt-2 text-xl text-neutral-500">
              No previous record
            </p>
          ) : (
            <p
              className={`mt-2 text-3xl font-black ${
                change > 0
                  ? "text-green-400"
                  : change < 0
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change.toFixed(1)} g
            </p>
          )}

        </div>

        <div className="rounded-xl bg-neutral-800 p-4">

          <p className="text-sm text-neutral-400">
            Last Weighed
          </p>

          <p className="mt-2 text-xl text-white">
            {daysSince == null
              ? "Never"
              : daysSince === 0
              ? "Today"
              : `${daysSince} day${daysSince === 1 ? "" : "s"} ago`}
          </p>

        </div>

      </div>

    </div>
  );
}