interface Props {
  total: number;
  available: number;
  sold: number;
  featured: number;
}

export default function InventoryStats({
  total,
  available,
  sold,
  featured,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Total Animals
        </p>

        <h2 className="mt-3 text-5xl font-black text-white">
          {total}
        </h2>
      </div>

      <div className="rounded-2xl border border-green-700 bg-green-950 p-6">
        <p className="text-sm text-green-400">
          Available
        </p>

        <h2 className="mt-3 text-5xl font-black text-green-400">
          {available}
        </h2>
      </div>

      <div className="rounded-2xl border border-red-700 bg-red-950 p-6">
        <p className="text-sm text-red-400">
          Sold
        </p>

        <h2 className="mt-3 text-5xl font-black text-red-400">
          {sold}
        </h2>
      </div>

      <div className="rounded-2xl border border-yellow-600 bg-yellow-950 p-6">
        <p className="text-sm text-yellow-400">
          Featured
        </p>

        <h2 className="mt-3 text-5xl font-black text-yellow-400">
          {featured}
        </h2>
      </div>
    </div>
  );
}