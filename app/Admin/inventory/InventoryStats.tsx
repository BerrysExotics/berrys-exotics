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

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-lg">
        <p className="text-sm uppercase tracking-widest text-neutral-400">
          My Collection
        </p>

        <h2 className="mt-3 text-5xl font-black text-white">
          {total}
        </h2>

        <p className="mt-2 text-neutral-500">
          Total Geckos
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-700 bg-emerald-950 p-6 shadow-lg">
        <p className="text-sm uppercase tracking-widest text-emerald-400">
          Available
        </p>

        <h2 className="mt-3 text-5xl font-black text-emerald-400">
          {available}
        </h2>

        <p className="mt-2 text-emerald-300">
          Ready for Sale
        </p>
      </div>

      <div className="rounded-2xl border border-red-700 bg-red-950 p-6 shadow-lg">
        <p className="text-sm uppercase tracking-widest text-red-400">
          Sold
        </p>

        <h2 className="mt-3 text-5xl font-black text-red-400">
          {sold}
        </h2>

        <p className="mt-2 text-red-300">
          Customer Animals
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-700 bg-yellow-950 p-6 shadow-lg">
        <p className="text-sm uppercase tracking-widest text-yellow-400">
          Featured
        </p>

        <h2 className="mt-3 text-5xl font-black text-yellow-400">
          {featured}
        </h2>

        <p className="mt-2 text-yellow-300">
          Highlighted Geckos
        </p>
      </div>

    </div>
  );
}