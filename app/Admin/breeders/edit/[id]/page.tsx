import EditBreederForm from "@/components/breeders/EditBreederForm";

export default async function EditBreederPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="mb-2 text-5xl font-black text-white">
        Edit Breeder
      </h1>

      <p className="mb-10 text-neutral-400">
        Update breeder information.
      </p>

      <EditBreederForm breederId={Number(id)} />
    </main>
  );
}