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
    <div className="grid gap-4 md:grid-cols-3">

      <input
        type="text"
        placeholder="Search geckos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white"
      />

      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white"
      >
        <option value="All">All Species</option>
        <option value="Crested Gecko">Crested Gecko</option>
        <option value="Leachianus">Leachianus</option>
      </select>

      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white"
      >
        <option value="All">All Availability</option>
        <option value="Available">Available</option>
        <option value="Hold">Hold</option>
        <option value="Sold">Sold</option>
        <option value="Retained">Retained</option>
      </select>

    </div>
  );
}