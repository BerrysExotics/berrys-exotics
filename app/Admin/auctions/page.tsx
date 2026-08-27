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
};

export default function AdminAuctionsPage() {
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
        .order("created_at", {
          ascending: false,
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
        .select("id, name, species, morph")
        .order("name");

    if (geckoError) {
      console.error(
        "Error loading geckos:",
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

  function getStatusStyle(status: string) {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";

      case "ended":
        return "bg-red-500/20 text-red-400 border-red-500/30";

      case "cancelled":
        return "bg-neutral-700 text-neutral-300 border-neutral-600";

      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  }

  if (loading) {
    return (
      <main className="space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-black text-white">
            Auctions
          </h1>

          <p className="mt-2 text-neutral-400">
            Create and manage Berrys_Exotics auctions.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <p className="text-neutral-400">
            Loading auctions...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8 p-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-black text-white">
            Auctions
          </h1>

          <p className="mt-2 text-neutral-400">
            Create and manage Berrys_Exotics auctions.
          </p>
        </div>

        <Link
          href="/Admin/auctions/create"
          className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
        >
          + Create Auction
        </Link>

      </div>

      {/* Empty State */}

      {auctions.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center">

          <div className="text-5xl">
            🦎
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            No auctions yet
          </h2>

          <p className="mt-2 text-neutral-400">
            Create your first auction to get started.
          </p>

          <Link
            href="/Admin/auctions/create"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Create Your First Auction
          </Link>

        </div>
      ) : (

        /* Auction List */

        <div className="space-y-6">

          {auctions.map((auction) => {
            const gecko = getGecko(
              auction.gecko_id
            );

            return (
              <div
                key={auction.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
              >

                {/* Auction Header */}

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {auction.title}
                    </h2>

                    {gecko && (
                      <p className="mt-2 text-neutral-300">
                        🦎 {gecko.name} —{" "}
                        {gecko.species}
                        {gecko.morph
                          ? ` — ${gecko.morph}`
                          : ""}
                      </p>
                    )}
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-wide ${getStatusStyle(
                      auction.status
                    )}`}
                  >
                    {auction.status}
                  </span>

                </div>

                {/* Auction Information */}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <div className="rounded-xl bg-neutral-800 p-4">
                    <p className="text-sm text-neutral-400">
                      Starting Bid
                    </p>

                    <p className="mt-1 text-xl font-bold text-green-400">
                      ${auction.starting_bid}
                    </p>
                  </div>

                  <div className="rounded-xl bg-neutral-800 p-4">
                    <p className="text-sm text-neutral-400">
                      Bid Increment
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      ${auction.minimum_bid_increment}
                    </p>
                  </div>

                  <div className="rounded-xl bg-neutral-800 p-4">
                    <p className="text-sm text-neutral-400">
                      Starts
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {formatDate(
                        auction.start_time
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl bg-neutral-800 p-4">
                    <p className="text-sm text-neutral-400">
                      Ends
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {formatDate(
                        auction.end_time
                      )}
                    </p>
                  </div>

                </div>

                {/* Description */}

                {auction.description && (
                  <div className="mt-6 border-t border-neutral-800 pt-6">

                    <p className="text-sm font-bold uppercase tracking-wider text-neutral-500">
                      Description
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-neutral-300">
                      {auction.description}
                    </p>

                  </div>
                )}

                {/* Current Bid */}

                <div className="mt-6 flex flex-col gap-4 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-neutral-400">
                      Current / Winning Bid
                    </p>

                    <p className="text-2xl font-black text-green-400">
                      {auction.winning_bid !== null
                        ? `$${auction.winning_bid}`
                        : "No bids yet"}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <Link
                      href={`/auctions/${auction.id}`}
                      target="_blank"
                      className="rounded-xl bg-neutral-800 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700"
                    >
                      👁 View
                    </Link>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </main>
  );
}