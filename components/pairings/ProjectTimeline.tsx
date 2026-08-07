interface Props {
  startDate: string | null;
  latestClutchDate: string | null;
  latestHatchDate: string | null;
  status: string;
}

function format(date: string | null) {
  if (!date) return "--";

  return new Date(date).toLocaleDateString();
}

export default function ProjectTimeline({
  startDate,
  latestClutchDate,
  latestHatchDate,
  status,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="text-3xl font-black text-white">
        📅 Project Timeline
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-4">

        <div>
          <p className="text-neutral-500">
            Started
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {format(startDate)}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Latest Clutch
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {format(latestClutchDate)}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Latest Hatch
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {format(latestHatchDate)}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Status
          </p>

          <p className="mt-2 text-xl font-bold text-emerald-400">
            {status}
          </p>
        </div>

      </div>

    </div>
  );
}