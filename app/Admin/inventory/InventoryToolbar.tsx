"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  species: string;
  setSpecies: (value: string) => void;

  availability: string;
  setAvailability: (value: string) => void;
}

export default function InventoryToolbar({
  search,
  setSearch,
  species,
  setSpecies,
  availability,
  setAvailability,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-black text-white">
        Search & Filters
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Search */}

        <div>

          <label className="mb-2 block font-semibold text-white">
            Search Collection
          </label>

          <input
            type="text"
            placeholder="Name, Animal ID, Morph..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* Species */}

        <div>

          <label className="mb-2 block font-semibold text-white">
            Species
          </label>

          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          >
            <option value="All">
              All Species
            </option>

            <option value="Crested Gecko">
              Crested Gecko
            </option>

            <option value="Leachianus">
              Leachianus
            </option>

          </select>

        </div>

        {/* Sales Status */}

        <div>

          <label className="mb-2 block font-semibold text-white">
            Sales Status
          </label>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          >
            <option value="All">
              All Sales Status
            </option>

            <option value="Available">
              🟢 Available
            </option>

            <option value="On Hold">
              🟡 On Hold
            </option>

            <option value="Not For Sale">
              🔒 Not For Sale
            </option>

            <option value="Sold">
              🔴 Sold
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}