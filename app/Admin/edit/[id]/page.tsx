import GeckoForm from "@/components/geckos/GeckoForm";

export default async function EditGeckoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-neutral-900 p-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-5xl font-bold">
          Edit Gecko
        </h1>

        <GeckoForm geckoId={id} />
      </div>
    </main>
  );
}