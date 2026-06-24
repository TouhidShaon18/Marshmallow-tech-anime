"use client";

import Image from "next/image";
import { Download, Facebook, RotateCcw, ShoppingBag } from "lucide-react";
import type { Character } from "@/lib/quiz-data";

type ResultCardProps = {
  name: string;
  character: Character;
  percentage: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
  onDownload: () => void;
  onShare: () => Promise<void>;
  onRetake: () => void;
};

export function ResultCard({
  name,
  character,
  percentage,
  cardRef,
  onDownload,
  onShare,
  onRetake,
}: ResultCardProps) {
  return (
    <section className="w-full max-w-xl">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-glow md:p-7"
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-pink via-lavender to-electric" />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-charcoal/10">
                <Image
                  src="/brand/marshmallow-logo.png"
                  alt="Marshmallow Tech logo"
                  width={42}
                  height={42}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-electric">
                Marshmallow Tech
              </p>
              <h2 className="mt-1 text-2xl font-black text-charcoal">
                {name}&apos;s Anime Match
              </h2>
              </div>
            </div>
            <div className="rounded-2xl bg-charcoal px-3 py-2 text-center text-white">
              <span className="block text-2xl font-black">{percentage}%</span>
              <span className="block text-[0.62rem] font-bold uppercase">match</span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
            <div className="mx-auto w-full max-w-64">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-lavender via-pink to-electric p-2">
                <div className="relative h-full overflow-hidden rounded-[1.25rem] bg-white">
                  <Image
                    src={character.image}
                    alt={`${character.name} character portrait`}
                    fill
                    sizes="(max-width: 640px) 260px, 220px"
                    className="object-cover"
                    priority
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
              <div className="mt-3 rounded-3xl border border-charcoal/10 bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-charcoal/45">
                  Participant
                </p>
                <p className="mt-1 text-xl font-black leading-none text-charcoal">
                  {name}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-charcoal/50">
                {character.anime}
              </p>
              <h3 className="mt-1 text-4xl font-black leading-none text-charcoal">
                {character.name}
              </h3>
              <blockquote className="mt-4 rounded-3xl bg-lavender/25 p-4 text-lg font-black leading-snug text-charcoal">
                &quot;{character.quote}&quot;
              </blockquote>
              <p className="mt-4 text-base font-semibold leading-relaxed text-charcoal/75">
                {character.personality}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-3xl border border-electric/20 bg-gradient-to-r from-lavender/30 via-pink/35 to-electric/20 p-4 text-center sm:grid-cols-[1fr_auto] sm:items-center sm:text-left">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-electric">
                Marshmallow reward
              </p>
              <p className="mt-1 text-lg font-black leading-tight text-charcoal">
                Get 2% off your setup, no matter your anime match.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-charcoal/10">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-charcoal/45">
                Code
              </p>
              <p className="text-2xl font-black text-charcoal">Luffy</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-charcoal p-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white">
            Built for Fans. By Fans.
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-electric px-4 py-3 text-sm font-black text-white shadow-blue transition hover:-translate-y-0.5"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          PNG
        </button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-charcoal px-4 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
        >
          <Facebook aria-hidden="true" className="h-4 w-4" />
          Facebook
        </button>
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-charcoal/10 bg-white px-4 py-3 text-sm font-black text-charcoal shadow-lg transition hover:-translate-y-0.5"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Retake
        </button>
        <a
          href="https://marshmallow-tech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-pink px-4 py-3 text-sm font-black text-charcoal shadow-lg transition hover:-translate-y-0.5"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          Build My Setup
        </a>
      </div>
    </section>
  );
}
