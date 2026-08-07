import HatchlingForm from "@/components/hatchlings/HatchlingForm";

export default function AddHatchlingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-5xl font-black text-white">
          Add Hatchling
        </h1>

        <p className="mt-2 text-neutral-400">
          Record a new hatchling.
        </p>
      </div>

      <HatchlingForm />
    </div>
  );
}