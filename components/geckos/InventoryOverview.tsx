interface Props {
  gecko: {
    name: string;
    morph: string;
    species: string;
    sex: string;
    weight: number | null;
    price: number | null;
    availability: string;
    status: string;
  };
}

export default function InventoryOverview({
  gecko,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        📋 Overview
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <h3 className="font-semibold text-neutral-400">
            Name
          </h3>

          <p className="text-lg text-white">
            {gecko.name}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Morph
          </h3>

          <p className="text-lg text-white">
            {gecko.morph}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Species
          </h3>

          <p className="text-lg text-white">
            {gecko.species}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Sex
          </h3>

          <p className="text-lg text-white">
            {gecko.sex}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Weight
          </h3>

          <p className="text-lg text-white">
            {gecko.weight ?? "-"} g
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Price
          </h3>

          <p className="text-lg font-bold text-green-400">
            {gecko.price != null
              ? `$${gecko.price}`
              : "Not Set"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Availability
          </h3>

          <span
            className={`inline-block rounded-full px-3 py-1 font-semibold ${
              gecko.availability === "Available"
                ? "bg-green-600 text-white"
                : gecko.availability === "Sold"
                ? "bg-red-600 text-white"
                : "bg-yellow-600 text-white"
            }`}
          >
            {gecko.availability}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-neutral-400">
            Status
          </h3>

          <p className="text-lg text-white">
            {gecko.status}
          </p>
        </div>

      </div>

    </div>
  );
}