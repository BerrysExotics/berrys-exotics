import { notFound } from "next/navigation";

import PairingForm from "@/components/pairings/PairingForm";

import { getPairing } from "@/lib/pairings/getPairing";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPairingPage({
  params,
}: Props) {
  const { id } = await params;

  const pairing = await getPairing(id);

  if (!pairing) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-10">

      <div className="space-y-4">

        <p className="font-semibold uppercase tracking-[0.35em] text-emerald-400">
          Breeding Management
        </p>

        <h1 className="text-5xl font-black text-white">
          Edit Breeding Group
        </h1>

        <p className="max-w-2xl text-lg text-neutral-400">
          Update this breeding group, change the assigned male or
          females, modify the group letter, notes, or breeding
          status.
        </p>

      </div>

      <PairingForm
        initialData={pairing}
        pairingId={Number(id)}
      />

    </main>
  );
}