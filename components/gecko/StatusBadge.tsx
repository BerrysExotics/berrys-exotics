type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    Available: "bg-green-600 text-white",
    Hold: "bg-yellow-500 text-black",
    Sold: "bg-red-600 text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide ${
        styles[status] ?? "bg-gray-600 text-white"
      }`}
    >
      {status}
    </span>
  );
}