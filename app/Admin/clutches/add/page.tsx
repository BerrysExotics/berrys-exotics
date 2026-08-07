import ClutchForm from "@/components/clutches/ClutchForm";

interface Props {
  searchParams: Promise<{
    pairing?: string;
  }>;
}

export default async function AddClutchPage({
  searchParams,
}: Props) {
  const { pairing } = await searchParams;

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      <div>

        <h1 className="text-5xl font-black text-white">
          Add Clutch
        </h1>

        <p className="mt-2 text-neutral-400">
          Record a new clutch.
        </p>

      </div>

      <ClutchForm
        defaultPairingId={pairing}
      />

    </div>
  );
}