import Link from "next/link";
import BreederCard from "./BreederCard";

interface Props {
  pairing: any;
  isPublic?: boolean;
}

export default function PairingCard({
  pairing,
  isPublic = false,
}: Props) {
  const male = pairing.male;

  const females =
    pairing.pairing_females?.map(
      (pf: any) => pf.female
    ) ?? [];

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-2xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <div className="mb-3 inline-flex rounded-full bg-emerald-600 px-4 py-1 text-sm font-black uppercase tracking-widest text-white">
            Group {pairing.group_letter ?? "-"}
          </div>

          <h2 className="text-3xl font-black text-white">
            {pairing.pairing_name}
          </h2>

          {pairing.start_date && (
            <p className="mt-2 text-neutral-400">
              Started{" "}
              {new Date(
                pairing.start_date
              ).toLocaleDateString()}
            </p>
          )}

        </div>

        <span className="rounded-full bg-green-600 px-5 py-2 font-bold text-white">
          {pairing.status}
        </span>

      </div>

      <div className="my-8 h-px bg-neutral-800" />

      <div className="grid items-start gap-6 lg:grid-cols-2">

        <BreederCard
          breeder={male}
          label="♂ Male"
          color="text-blue-400"
          isPublic={isPublic}
        />

        <div className="space-y-5">

          {females.length === 0 ? (

            <div className="rounded-2xl bg-neutral-800 p-6 text-neutral-500">
              No females assigned.
            </div>

          ) : (

            females.map((female: any) => (

              <BreederCard
                key={female.id}
                breeder={female}
                label="♀ Female"
                color="text-pink-400"
                compact
                isPublic={isPublic}
              />

            ))

          )}

        </div>

      </div>

      {pairing.notes && (

        <div className="mt-8 rounded-2xl bg-neutral-800 p-5">

          <p className="text-sm uppercase tracking-wide text-neutral-400">
            Notes
          </p>

          <p className="mt-3 text-white">
            {pairing.notes}
          </p>

        </div>

      )}

      {isPublic ? (

        <div className="mt-8">

          <Link
            href={`/breeding-groups/${pairing.id}`}
            className="block rounded-xl bg-emerald-600 py-3 text-center font-bold text-white transition hover:bg-emerald-700"
          >
            View Breeding Group →
          </Link>

        </div>

      ) : (

        <div className="mt-8 flex gap-4">

          <Link
            href={`/Admin/pairings/${pairing.id}`}
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-center font-bold text-white transition hover:bg-emerald-700"
          >
            🦎 Open Group
          </Link>

          <Link
            href={`/Admin/pairings/${pairing.id}/edit`}
            className="rounded-xl bg-neutral-700 px-6 py-3 font-bold text-white transition hover:bg-neutral-600"
          >
            ✏ Edit
          </Link>

        </div>

      )}

    </div>
  );
}