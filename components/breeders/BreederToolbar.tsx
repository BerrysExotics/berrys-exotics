"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  species: string;
  setSpecies: (value: string) => void;

  sex: string;
  setSex: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
}

export default function BreederToolbar({
  search,
  setSearch,
  species,
  setSpecies,
  sex,
  setSex,
  status,
  setStatus,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <div className="grid gap-4 lg:grid-cols-4">

        <input
          type="text"
          placeholder="🔍 Search breeders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white outline-none focus:border-emerald-500"
        />

        <select
          value={species}
          onChange={(e) =>
            setSpecies(e.target.value)
          }
          className="rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white"
        >
          <option>All</option>
          <option>Leachianus</option>
          <option>Crested</option>
        </select>

        <select
          value={sex}
          onChange={(e) =>
            setSex(e.target.value)
          }
          className="rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white"
        >
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white"
        >
          <option>All</option>
          <option>Active</option>
          <option>Retired</option>
        </select>

      </div>

    </div>
  );
}