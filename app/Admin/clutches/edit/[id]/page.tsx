import EditClutchForm from "@/components/clutches/EditClutchForm";

export default async function EditClutchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-5xl font-black text-white">
          Edit Clutch
        </h1>

        <p className="mt-2 text-neutral-400">
          Update clutch information.
        </p>
      </div>

      <EditClutchForm clutchId={Number(id)} />
    </div>
  );
}