interface Props {
  children: React.ReactNode;
}

export default function AdminContent({
  children,
}: Props) {
  return (
    <main className="flex-1 overflow-y-auto bg-neutral-950 p-8">
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </main>
  );
}