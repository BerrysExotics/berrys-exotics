interface WeightCompleteProps {
  total: number;
}

export default function WeightComplete({
  total,
}: WeightCompleteProps) {
  return (
    <div className="rounded-2xl border border-green-700 bg-neutral-900 p-16 text-center">

      <div className="text-7xl">
        🎉
      </div>

      <h1 className="mt-6 text-5xl font-black text-white">
        Weight Queue Complete
      </h1>

      <p className="mt-4 text-xl text-neutral-300">
        Every gecko has been weighed.
      </p>

      <div className="mt-10 rounded-xl bg-neutral-800 p-6">

        <p className="text-neutral-400">
          Animals Recorded
        </p>

        <p className="mt-2 text-5xl font-black text-emerald-400">
          {total}
        </p>

      </div>

      <p className="mt-8 text-neutral-500">
        Great job! Your collection is now completely up to date.
      </p>

    </div>
  );
}