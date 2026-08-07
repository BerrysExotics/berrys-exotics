"use client";

import { GeckoWeight } from "@/lib/geckos/getWeightHistory";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  weights: GeckoWeight[];
}

export default function GrowthChart({
  weights,
}: Props) {
  if (weights.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-8 text-center text-neutral-400">
        No weight history recorded.
      </div>
    );
  }

  const data = [...weights]
    .reverse()
    .map((weight) => ({
      date: new Date(weight.recorded_at).toLocaleDateString(),
      weight: Number(weight.weight),
    }));

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <h2 className="mb-6 text-3xl font-black text-white">
        📈 Growth Chart
      </h2>

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis
              unit=" g"
              domain={["dataMin - 1", "dataMax + 1"]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}