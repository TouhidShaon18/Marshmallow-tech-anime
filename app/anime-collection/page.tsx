import Image from "next/image";
import { ArrowLeft, Monitor, ShoppingBag } from "lucide-react";

const picks = [
  "Anime desk mats",
  "RGB display shelves",
  "Figure lighting kits",
  "Collector cable drops",
];

export default function AnimeCollectionPage() {
  return (
    <main className="min-h-screen px-4 py-6 text-charcoal sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-charcoal shadow-lg"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to quiz
        </a>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-electric shadow-lg">
              <Image
                src="/brand/marshmallow-logo.png"
                alt="Marshmallow Tech logo"
                width={22}
                height={22}
                className="h-5 w-5 object-contain"
              />
              Marshmallow Tech
            </div>
            <h1 className="mt-5 text-5xl font-black leading-none sm:text-6xl">
              Build My Setup
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-charcoal/70">
              A placeholder collection page for anime-inspired tech, display gear, and fan-ready desk upgrades.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-glow backdrop-blur">
            <div className="grid aspect-video place-items-center rounded-[1.5rem] bg-gradient-to-br from-lavender via-pink to-electric text-white">
              <Monitor aria-hidden="true" className="h-20 w-20" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {picks.map((pick) => (
                <div
                  key={pick}
                  className="flex min-h-16 items-center gap-3 rounded-3xl border border-charcoal/10 bg-white p-4"
                >
                  <ShoppingBag aria-hidden="true" className="h-5 w-5 text-electric" />
                  <span className="font-black">{pick}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
