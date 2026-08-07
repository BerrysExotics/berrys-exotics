import BreederForm from "@/components/breeders/BreederForm";

export default function AddBreederPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-black text-white mb-2">
        Add Breeder
      </h1>

      <p className="text-neutral-400 mb-10">
        Create a breeder profile for your collection.
      </p>

      <BreederForm />

    </main>
  );
}