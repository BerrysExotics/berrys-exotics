import EditHatchlingForm from "@/components/hatchlings/EditHatchlingForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditHatchlingPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>
        <h1 className="text-5xl font-black text-white">
          Edit Hatchling
        </h1>

        <p className="mt-2 text-neutral-400">
          Update hatchling information.
        </p>
      </div>

      <EditHatchlingForm
        hatchlingId={Number(id)}
      />

    </div>
  );
}