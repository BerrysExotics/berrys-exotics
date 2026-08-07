interface Female {
  id: number;
  name: string;
  species: string;
  morph: string;
  weight: number | null;
}

interface Props {
  female: Female;
}

export default function FemaleCard({
  female,
}: Props) {
  return (
    <div className="rounded-2xl bg-neutral-800 p-6">

      <h3 className="text-2xl font-black text-white">
        {female.name}
      </h3>

      <div className="mt-5 space-y-3">

        <div>
          <p className="text-neutral-500">
            Species
          </p>

          <p className="text-white">
            {female.species}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Morph
          </p>

          <p className="text-white">
            {female.morph || "--"}
          </p>
        </div>

        <div>
          <p className="text-neutral-500">
            Weight
          </p>

          <p className="font-bold text-white">
            ⚖ {female.weight ?? "--"} g
          </p>
        </div>

      </div>

    </div>
  );
}