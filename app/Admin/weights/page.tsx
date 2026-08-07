import WeightQueue from "@/components/geckos/WeightQueue";

export default function WeightQueuePage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-10 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-3 text-5xl font-black">
          ⚖️ Weight Queue
        </h1>

        <p className="mb-10 text-neutral-400">
          Record weights quickly using the Save & Next workflow.
        </p>

        <WeightQueue />

      </div>
    </main>
  );
}