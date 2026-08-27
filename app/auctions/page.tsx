"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Auction = {
  id: string;
  title: string;
  gecko_id: string | null;
  starting_bid: number;
  minimum_bid_increment: number;
  start_time: string;
  end_time: string;
  status: string;
  description: string | null;
  winning_bid: number | null;
};

type Gecko = {
  id: string;
  name: string;
  species: string;
  morph: string | null;
  sex: string;
  weight: number | null;
};

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [geckos, setGeckos] = useState<Gecko[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuctions();
  }, []);

  async function loadAuctions() {
    setLoading(true);

    const { data: auctionData, error: auctionError } =
      await supabase
        .from("auctions")
        .select("*")
        .eq("status", "active")
        .order("end_time", {
          ascending: true,
        });

    if (auctionError) {
      console.error(
        "Error loading auctions:",
        auctionError
      );
    } else {
      setAuctions(auctionData ?? []);
    }

    const { data: geckoData, error: geckoError } =
      await supabase
        .from("geckos")
        .select(
          "id, name, species, morph, sex, weight"
        )
        .order("name");

    if (geckoError) {
      console.error(
        "Error loading animals:",
        geckoError
      );
    } else {
      setGeckos(geckoData ?? []);
    }

    setLoading(false);
  }

  function getGecko(geckoId: string | null) {
    if (!geckoId) {
      return null;
    }

    return geckos.find(
      (gecko) => gecko.id === geckoId
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
              Berrys_Exotics
            </p>

            <h1 className="text-5xl font-black">
              Auctions
            </h1>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-10 text-center">
            <p className="text-neutral-400">
              Loading auctions...
            </p>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
            Berrys_Exotics
          </p>

          <h1 className="text-5xl font-black">
            Auctions
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Browse active Berrys_Exotics auctions and
            discover your next animal.
          </p>
        </div>

        {/* No Auctions */}

        {auctions.length === 0 ? (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-10 text-center">

            <div className="text-6xl">
              🦎
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No Active Auctions
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-neutral-400">
              There are currently no active auctions.
              Check back soon for upcoming
              Berrys_Exotics auctions.
            </p>

          </div>
        ) : (

          /* Auction Grid */

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {auctions.map((auction) => {
              const gecko = getGecko(
                auction.gecko_id
              );

              return (
                <article
                  key={auction.id}
                  className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-xl"
                >

                  {/* Animal Preview */}

                  <div className="flex h-56 items-center justify-center bg-neutral-800 text-7xl">
                    🦎
                  </div>

                  {/* Auction Content */}

                  <div className="p-6">

                    <div className="mb-4 flex items-start justify-between gap-4">

                      <div>
                        <h2 className="text-2xl font-black">
                          {auction.title}
                        </h2>

                        {gecko && (
                          <p className="mt-2 text-neutral-400">
                            {gecko.name}
                          </p>
                        )}
                      </div>

                      <span className="rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
                        Active
                      </span>

                    </div>

                    {/* Animal Information */}

                    {gecko && (
                      <div className="mb-6 space-y-1 text-sm text-neutral-300">

                        <p>
                          <span className="text-neutral-500">
                            Species:
                          </span>{" "}
                          {gecko.species}
                        </p>

                        {gecko.morph && (
                          <p>
                            <span className="text-neutral-500">
                              Morph:
                            </span>{" "}
                            {gecko.morph}
                          </p>
                        )}

                        <p>
                          <span className="text-neutral-500">
                            Sex:
                          </span>{" "}
                          {gecko.sex}
                        </p>

                        {gecko.weight !== null && (
                          <p>
                            <span className="text-neutral-500">
                              Weight:
                            </span>{" "}
                            {gecko.weight} g
                          </p>
                        )}

                      </div>
                    )}

                    {/* Bidding Information */}

                    <div className="grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-neutral-800 p-4">
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          Starting Bid
                        </p>

                        <p className="mt-1 text-xl font-black text-emerald-400">
                          ${auction.starting_bid}
                        </p>
                      </div>

                      <div className="rounded-xl bg-neutral-800 p-4">
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          Current Bid
                        </p>

                        <p className="mt-1 text-xl font-black text-white">
                          {auction.winning_bid !== null
                            ? `$${auction.winning_bid}`
                            : "No bids"}
                        </p>
                      </div>

                    </div>

                    {/* End Time */}

                    <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4">

                      <p className="text-xs uppercase tracking-wide text-neutral-500">
                        Auction Ends
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {formatDate(
                          auction.end_time
                        )}
                      </p>

                    </div>

                    {/* View Button */}

                    <Link
                      href={`/auctions/${auction.id}`}
                      className="mt-6 block w-full rounded-xl bg-emerald-600 px-5 py-3 text-center font-bold text-white transition hover:bg-emerald-700"
                    >
                      View Auction
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}