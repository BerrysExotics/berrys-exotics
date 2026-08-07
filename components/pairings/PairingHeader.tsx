interface Props {
  pairingName: string;
  startDate: string | null;
  status: string;
}

export default function PairingHeader({
  pairingName,
  startDate,
  status,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-5xl font-black text-white">
            ❤️ {pairingName}
          </h1>

          <p className="mt-3 text-neutral-400">
            Started{" "}
            {startDate
              ? new Date(startDate).toLocaleDateString()
              : "Unknown"}
          </p>

        </div>

        <div>

          <span className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-lg font-bold text-white">
            {status}
          </span>

        </div>

      </div>

    </div>
  );
}