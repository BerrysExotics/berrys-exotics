import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function PrimaryButton({
  href,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className="
        inline-flex
        items-center
        justify-center
        rounded-2xl
        bg-emerald-600
        px-8
        py-4
        text-lg
        font-bold
        text-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-emerald-500
        hover:shadow-xl
        hover:shadow-emerald-500/30
      "
    >
      {children}
    </Link>
  );
}