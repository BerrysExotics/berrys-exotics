import PairingForm from "@/components/pairings/PairingForm";

export default function AddPairingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">

      <div className="space-y-4">

        <p className="font-semibold uppercase tracking-[0.35em] text-emerald-400">
          Breeding Management
        </p>

        <h1 className="text-5xl font-black text-white">
          Create Breeding Group
        </h1>

        <p className="max-w-2xl text-lg text-neutral-400">
          Organize one breeding male with one or more females into a
          breeding group. Clutches, eggs, hatchlings, and lineage will
          automatically be linked to this group.
        </p>

      </div>

      <PairingForm />

    </div>
  );
}