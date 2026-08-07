"use client";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  species: string;
  setSpecies: (value: string) => void;

  sex: string;
  setSex: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  resultCount: number;
};

export default function CollectionToolbar({
  searchTerm,
  setSearchTerm,
  species,
  setSpecies,
  sex,
  setSex,
  status,
  setStatus,
  sort,
  setSort,
  resultCount,
}: Props) {
  return (
    <div className="mb-10 rounded-3xl border border-neutral-800 bg-neutral-800 p-5 shadow-xl md:p-6">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        <input
          type="text"
          placeholder="🔍 Search geckos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
        />

        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="h-12 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="All">All Species</option>
          <option value="Crested">Crested</option>
          <option value="Leachianus">Leachianus</option>
        </select>

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="h-12 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="All">All Sexes</option>
          <option>Male</option>
          <option>Female</option>
          <option>Probable Male</option>
          <option>Probable Female</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option>Available</option>
          <option>Hold</option>
          <option>Sold</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 rounded-xl border border-neutral-700 bg-neutral-900 px-4 text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Name">Name (A–Z)</option>
          <option value="PriceHigh">Highest Price</option>
          <option value="PriceLow">Lowest Price</option>
        </select>

      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-neutral-700 pt-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-neutral-400">
          Showing{" "}
          <span className="font-bold text-white">
            {resultCount}
          </span>{" "}
          gecko{resultCount === 1 ? "" : "s"}
        </p>

        <p className="text-xs uppercase tracking-widest text-emerald-400">
          Filters update instantly
        </p>

      </div>

    </div>
  );
}