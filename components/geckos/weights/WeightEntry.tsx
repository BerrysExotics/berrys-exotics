interface WeightEntryProps {
  value: string;
  saving: boolean;
  canGoPrevious: boolean;
  onChange(value: string): void;
  onSave(): void;
  onPrevious(): void;
  onKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ): void;
}

export default function WeightEntry({
  value,
  saving,
  canGoPrevious,
  onChange,
  onSave,
  onPrevious,
  onKeyDown,
}: WeightEntryProps) {
  return (
    <div className="space-y-6">

      <input
        autoFocus
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter New Weight"
        className="w-full rounded-xl bg-neutral-800 p-4 text-xl text-white"
      />

      <div className="flex gap-4">

        <button
          disabled={!canGoPrevious || saving}
          onClick={onPrevious}
          className="flex-1 rounded-xl bg-neutral-700 p-4 font-bold disabled:opacity-30"
        >
          ← Previous
        </button>

        <button
          disabled={saving}
          onClick={onSave}
          className="flex-1 rounded-xl bg-emerald-600 p-4 font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "💾 Save & Next"}
        </button>

      </div>

      <p className="text-center text-sm text-neutral-500">
        Tip: Press{" "}
        <span className="font-bold text-white">
          Enter
        </span>{" "}
        after typing a weight.
      </p>

    </div>
  );
}