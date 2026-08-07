interface Male {
  id: number;
  name: string;
  species: string;
  morph: string;
  weight: number | null;
}

interface Props {
  male: Male | null;
}

export default function MaleCard({
  male,
}: Props) {
  if (!male) {
    return (
      <div className="rounded-3xl border border-blue-700 bg-neutral-900 p-8">
        <h2 className="text-3xl font-black text-blue-400">
          ♂ Male
        </h2>

        <p className="mt-6 text-neutral-400">
          No male assigned.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-blue-700 bg-neutral-900 p-8">

      <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
        Male
      </p>

      <h2 className="mt-3 text-4xl font-black text-white">
        {male.name}
      </h2>

      <div className="mt-8 space-y-4">

        <div>
          <p className="text-neutral-500">
            Species
          </p>

          <p className="text-lg text-white">
            {male.species}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Morph
          </p>

          <p className="text-lg text-white">
            {male.morph || "--"}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Weight
          </p>

          <p className="text-lg font-bold text-white">
            ⚖ {male.weight ?? "--"} g
          </p>
        </div>

      </div>

    </div>
  );
}