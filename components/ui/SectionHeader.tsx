type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <div className="mb-16 text-center">

      <p className="mb-3 font-semibold uppercase tracking-[0.35em] text-emerald-400">
        {eyebrow}
      </p>

      <h2 className="text-5xl font-black text-white">
        {title}
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
        {description}
      </p>

    </div>
  );
}