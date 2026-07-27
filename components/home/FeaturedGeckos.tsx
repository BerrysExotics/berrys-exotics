import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default async function FeaturedGeckos() {
  const { data: geckos, error } = await supabase
    .from("geckos")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="py-24 bg-neutral-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Featured Geckos</h2>
        <p>Unable to load geckos.</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Geckos
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos?.map((gecko) => (
            <div
              key={gecko.id}
              className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <div className="relative h-72">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/geckos/${gecko.image}`}
                  alt={gecko.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">{gecko.name}</h3>

                <p className="text-green-400 mt-1">
                  {gecko.morph}
                </p>

                <div className="flex justify-between mt-5">
                  <span>{gecko.sex}</span>

                  <span className="font-bold text-xl">
                    ${gecko.price}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                    {gecko.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}