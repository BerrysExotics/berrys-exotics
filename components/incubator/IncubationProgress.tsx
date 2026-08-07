interface Props {
  laidDate: string | null;
  expectedHatchDate: string | null;
}

export default function IncubationProgress({
  laidDate,
  expectedHatchDate,
}: Props) {
  if (!laidDate) {
    return (
      <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-6">
        <p className="text-neutral-400">
          No incubation dates available.
        </p>
      </div>
    );
  }

  const laid = new Date(laidDate);
  const today = new Date();

  const elapsedDays = Math.max(
    0,
    Math.floor(
      (today.getTime() - laid.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  let percent = 0;

  if (expectedHatchDate) {
    const hatch = new Date(expectedHatchDate);

    const totalDays = Math.max(
      1,
      Math.ceil(
        (hatch.getTime() - laid.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    percent = Math.min(
      100,
      Math.round((elapsedDays / totalDays) * 100)
    );
  }

  let barColor = "bg-emerald-500";

  if (percent >= 90) {
    barColor = "bg-red-500";
  } else if (percent >= 70) {
    barColor = "bg-yellow-400";
  }

  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-6">

      <div className="mb-6">

        <p className="font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Incubation
        </p>

        <h3 className="mt-2 text-4xl font-black text-white">
          {elapsedDays} Days
        </h3>

        <p className="mt-1 text-neutral-400">
          Incubating
        </p>

      </div>

      <div className="h-4 overflow-hidden rounded-full bg-neutral-800">

        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span className="text-neutral-400">
            Laid
          </span>

          <span className="font-semibold">
            {new Date(laidDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-400">
            Expected Hatch
          </span>

          <span className="font-semibold">
            {expectedHatchDate
              ? new Date(expectedHatchDate).toLocaleDateString()
              : "-"}
          </span>
        </div>

      </div>

    </div>
  );
}