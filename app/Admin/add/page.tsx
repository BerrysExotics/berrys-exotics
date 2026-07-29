import GeckoForm from "@/components/geckos/GeckoForm";

export default function AddGeckoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black text-white mb-10">
          Add New Gecko
        </h1>

        <GeckoForm />

      </div>
    </main>
  );
}