import InfoRow from "./InfoRow";

type Props = {
  species: string;
  morph: string;
  sex: string;
  weight: number | null;
  hatchDate: string | null;
  sire: string | null;
  dam: string | null;
};

export default function GeckoInfo({
  species,
  morph,
  sex,
  weight,
  hatchDate,
  sire,
  dam,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold">
        Gecko Information
      </h2>

      <InfoRow
        label="Species"
        value={species}
      />

      <InfoRow
        label="Morph"
        value={morph}
      />

      <InfoRow
        label="Sex"
        value={sex}
      />

      <InfoRow
        label="Weight"
        value={weight ? `${weight} g` : "Unknown"}
      />

      <InfoRow
        label="Hatch Date"
        value={hatchDate ?? "Unknown"}
      />

      <InfoRow
        label="Sire"
        value={sire ?? "Unknown"}
      />

      <InfoRow
        label="Dam"
        value={dam ?? "Unknown"}
      />
    </div>
  );
}