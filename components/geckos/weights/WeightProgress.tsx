interface WeightProgressProps {
  current: number;
  total: number;
}

export default function WeightProgress({
  current,
  total,
}: WeightProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-3">

      <div className="h-4 overflow-hidden rounded-full bg-neutral-800">

        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="flex justify-between text-sm text-neutral-400">

        <span>
          {current} of {total}
        </span>

        <span>
          {Math.round(progress)}%
        </span>

      </div>

    </div>
  );
}