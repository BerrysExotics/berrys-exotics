type Props = {
  label: string;
  value: string;
};

export default function InfoRow({ label, value }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-800 py-4">
      <span className="font-semibold text-gray-400">
        {label}
      </span>

      <span className="text-right font-medium">
        {value}
      </span>
    </div>
  );
}