import InventoryManager from "./InventoryManager";

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-neutral-900 p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold">
        Inventory Manager
      </h1>

      <InventoryManager />
    </main>
  );
}