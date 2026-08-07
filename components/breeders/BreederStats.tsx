import { BreederStats as Stats } from "@/lib/breeders/getBreederStats";

interface Props {
  stats: Stats;
}

export default function BreederStats({
  stats,
}: Props) {
  const cards = [
    {
      title: "Total Breeders",
      value: stats.total,
      color: "text-white",
      icon: "🦎",
    },
    {
      title: "Active",
      value: stats.active,
      color: "text-emerald-400",
      icon: "❤️",
    },
    {
      title: "Males",
      value: stats.males,
      color: "text-blue-400",
      icon: "♂️",
    },
    {
      title: "Females",
      value: stats.females,
      color: "text-pink-400",
      icon: "♀️",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">
              {card.icon}
            </span>

            <span
              className={`text-4xl font-black ${card.color}`}
            >
              {card.value}
            </span>
          </div>

          <p className="mt-4 text-neutral-400">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
}