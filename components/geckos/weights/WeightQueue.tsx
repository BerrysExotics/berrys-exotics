"use client";

import { useEffect, useRef, useState } from "react";

import {
  getWeightQueue,
  WeightQueueGecko,
} from "@/lib/geckos/getWeightQueue";

import { saveWeight } from "@/lib/geckos/saveWeight";

import WeightProgress from "./WeightProgress";
import WeightCard from "./WeightCard";
import WeightEntry from "./WeightEntry";
import WeightComplete from "./WeightComplete";

export default function WeightQueue() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [finished, setFinished] = useState(false);

  const [queue, setQueue] = useState<WeightQueueGecko[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newWeight, setNewWeight] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadQueue() {
      try {
        const animals = await getWeightQueue();
        setQueue(animals);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadQueue();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-neutral-900 p-10 text-center">
        Loading Weight Queue...
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="rounded-2xl bg-neutral-900 p-10 text-center">
        No geckos found.
      </div>
    );
  }

  if (finished) {
    return <WeightComplete total={queue.length} />;
  }

  const gecko = queue[currentIndex];

  async function handleSaveAndNext() {
    if (!newWeight) {
      alert("Please enter a weight.");
      return;
    }

    try {
      setSaving(true);

      const weight = Number(newWeight);

      await saveWeight(gecko.id, weight);

      const updated = [...queue];

      updated[currentIndex] = {
        ...gecko,
        previous_weight: gecko.current_weight,
        current_weight: weight,
        last_weight: weight,
        last_recorded: new Date().toISOString(),
      };

      setQueue(updated);

      setNewWeight("");

      if (currentIndex < updated.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setFinished(true);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to save weight.");
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveAndNext();
    }
  }

  return (
    <div className="space-y-8">

      <WeightProgress
        current={currentIndex + 1}
        total={queue.length}
      />

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-8">

        <WeightCard gecko={gecko} />

        <WeightEntry
          value={newWeight}
          saving={saving}
          canGoPrevious={currentIndex > 0}
          onChange={setNewWeight}
          onSave={handleSaveAndNext}
          onPrevious={() =>
            setCurrentIndex((i) => i - 1)
          }
          onKeyDown={handleKeyDown}
        />

      </div>

    </div>
  );
}