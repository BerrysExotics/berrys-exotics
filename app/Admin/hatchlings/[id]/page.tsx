import { notFound } from "next/navigation";

import HatchlingProfile from "@/components/hatchlings/HatchlingProfile";
import WeightHistory from "@/components/hatchlings/WeightHistory";
import RecordWeightButton from "@/components/hatchlings/RecordWeightButton";

import { getHatchling } from "@/lib/hatchlings/getHatchling";
import { getWeightHistory } from "@/lib/hatchlings/getWeightHistory";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function HatchlingPage({
  params,
}: Props) {
  const { id } = await params;

  const hatchling = await getHatchling(Number(id));

  if (!hatchling) {
    notFound();
  }

  const weights = await getWeightHistory(Number(id));

  return (
    <div className="space-y-8">

      <HatchlingProfile
        hatchling={hatchling}
      />

      <div className="flex justify-end">
        <RecordWeightButton
          hatchlingId={Number(id)}
        />
      </div>

      <WeightHistory
        weights={weights}
      />

    </div>
  );
}