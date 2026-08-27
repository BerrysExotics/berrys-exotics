"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type AuctionGecko = {
  id: string;
  name: string;
  species: string;
  morph: string | null;
  sex: string;
  weight: number | null;
};

export default function CreateAuctionPage() {
  const [geckos, setGeckos] = useState<AuctionGecko[]>([]);
  const [selectedGeckoId, setSelectedGeckoId] = useState("");

  const [loadingGeckos, setLoadingGeckos] = useState(true);

  const [title, setTitle] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [bidIncrement, setBidIncrement] = useState("");
  const [duration, setDuration] = useState("24");
  const [startType, setStartType] = useState("now");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadGeckos() {
      setLoadingGeckos(true);

      const { data, error } = await supabase
        .from("geckos")
        .select(
          "id, name, species, morph, sex, weight"
        )
        .order("name");

      if (error) {
        console.error("Error loading geckos:", error);
      } else {
        setGeckos(data ?? []);
      }

      setLoadingGeckos(false);
    }

    loadGeckos();
  }, []);

  const selectedGecko = geckos.find(
    (gecko) => gecko.id === selectedGeckoId
  );

  const canCreate =
    title.trim() !== "" &&
    startingBid !== "" &&
    bidIncrement !== "" &&
    selectedGeckoId !== "";

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-10">
          <Link
            href="/Admin/auctions"
            className="mb-6 inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            ← Back to Auctions
          </Link>

          <h1 className="text-4xl font-black">
            Create Auction
          </h1>

          <p className="mt-2 text-neutral-400">
            Set up a new Berrys_Exotics auction.
          </p>
        </div>

        <div className="space-y-8">

          {/* Auction Details */}

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">
              Auction Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Auction Title */}

              <div className="md:col-span-2">
                <label className="mb-2 block font-semibold">
                  Auction Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: Berry's Special Auction"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                />
              </div>

              {/* Starting Bid */}

              <div>
                <label className="mb-2 block font-semibold">
                  Starting Bid
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={startingBid}
                    onChange={(e) =>
                      setStartingBid(e.target.value)
                    }
                    placeholder="100"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 py-3 pl-8 pr-4 text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Bid Increment */}

              <div>
                <label className="mb-2 block font-semibold">
                  Minimum Bid Increment
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                    $
                  </span>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={bidIncrement}
                    onChange={(e) =>
                      setBidIncrement(e.target.value)
                    }
                    placeholder="10"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 py-3 pl-8 pr-4 text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Duration */}

              <div>
                <label className="mb-2 block font-semibold">
                  Auction Duration
                </label>

                <select
                  value={duration}
                  onChange={(e) =>
                    setDuration(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="6">6 Hours</option>
                  <option value="12">12 Hours</option>
                  <option value="24">24 Hours</option>
                  <option value="48">2 Days</option>
                  <option value="72">3 Days</option>
                  <option value="120">5 Days</option>
                  <option value="168">7 Days</option>
                </select>
              </div>

              {/* Start Type */}

              <div>
                <label className="mb-2 block font-semibold">
                  Start Time
                </label>

                <select
                  value={startType}
                  onChange={(e) =>
                    setStartType(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
                  <option value="now">
                    Start Immediately
                  </option>

                  <option value="scheduled">
                    Schedule Start
                  </option>
                </select>
              </div>

            </div>
          </section>

          {/* Auction Animal */}

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="mb-2 text-2xl font-bold">
              Auction Animal
            </h2>

            <p className="mb-6 text-neutral-400">
              Choose an animal from your existing Berrys_Exotics inventory.
            </p>

            <div>
              <label className="mb-2 block font-semibold">
                Select Animal
              </label>

              {loadingGeckos ? (
                <div className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-4 text-neutral-400">
                  Loading your animals...
                </div>
              ) : geckos.length === 0 ? (
                <div className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-4 text-neutral-400">
                  No animals found in your inventory.
                </div>
              ) : (
                <select
                  value={selectedGeckoId}
                  onChange={(e) =>
                    setSelectedGeckoId(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
                  <option value="">
                    Select an animal...
                  </option>

                  {geckos.map((gecko) => (
                    <option
                      key={gecko.id}
                      value={gecko.id}
                    >
                      {gecko.name} — {gecko.species}
                      {gecko.morph
                        ? ` — ${gecko.morph}`
                        : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Selected Animal */}

            {selectedGecko && (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-neutral-800 p-5">

                <p className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Selected Animal
                </p>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-neutral-400">
                      Name
                    </p>

                    <p className="font-semibold text-white">
                      {selectedGecko.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-400">
                      Species
                    </p>

                    <p className="font-semibold text-white">
                      {selectedGecko.species}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-400">
                      Morph
                    </p>

                    <p className="font-semibold text-white">
                      {selectedGecko.morph || "Not listed"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-400">
                      Sex
                    </p>

                    <p className="font-semibold text-white">
                      {selectedGecko.sex}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-400">
                      Weight
                    </p>

                    <p className="font-semibold text-white">
                      {selectedGecko.weight !== null
                        ? `${selectedGecko.weight} g`
                        : "Not listed"}
                    </p>
                  </div>

                </div>
              </div>
            )}
          </section>

          {/* Description */}

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">
              Auction Description
            </h2>

            <textarea
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Add information about this auction..."
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </section>

          {/* Auction Summary */}

          {selectedGecko && (
            <section className="rounded-2xl border border-emerald-500/30 bg-neutral-900 p-6">
              <h2 className="mb-6 text-2xl font-bold">
                Auction Summary
              </h2>

              <div className="grid gap-4 md:grid-cols-2">

                <div>
                  <p className="text-sm text-neutral-400">
                    Animal
                  </p>

                  <p className="font-semibold">
                    {selectedGecko.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-400">
                    Starting Bid
                  </p>

                  <p className="font-semibold">
                    {startingBid
                      ? `$${startingBid}`
                      : "Not set"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-400">
                    Bid Increment
                  </p>

                  <p className="font-semibold">
                    {bidIncrement
                      ? `$${bidIncrement}`
                      : "Not set"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-400">
                    Duration
                  </p>

                  <p className="font-semibold">
                    {duration === "1"
                      ? "1 Hour"
                      : duration === "2"
                      ? "2 Hours"
                      : duration === "6"
                      ? "6 Hours"
                      : duration === "12"
                      ? "12 Hours"
                      : duration === "24"
                      ? "24 Hours"
                      : duration === "48"
                      ? "2 Days"
                      : duration === "72"
                      ? "3 Days"
                      : duration === "120"
                      ? "5 Days"
                      : "7 Days"}
                  </p>
                </div>

              </div>
            </section>
          )}

          {/* Buttons */}

          <div className="flex flex-wrap justify-end gap-4">

            <Link
              href="/Admin/auctions"
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
            >
              Cancel
            </Link>

            <button
              type="button"
              disabled={!canCreate}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Auction
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}