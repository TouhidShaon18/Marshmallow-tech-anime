"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Character } from "@/lib/quiz-data";

type SpinWheelProps = {
  characters: Character[];
  winnerId: string;
  spinning: boolean;
  onComplete: () => void;
};

export function SpinWheel({
  characters,
  winnerId,
  spinning,
  onComplete,
}: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const slice = 360 / characters.length;
  const winnerIndex = characters.findIndex((character) => character.id === winnerId);

  const gradient = useMemo(
    () =>
      characters
        .map((character, index) => {
          const start = index * slice;
          const end = (index + 1) * slice;
          return `${character.accent} ${start}deg ${end}deg`;
        })
        .join(", "),
    [characters, slice],
  );

  useEffect(() => {
    if (!spinning || winnerIndex < 0) {
      return;
    }

    const targetCenter = winnerIndex * slice + slice / 2;
    const finalRotation = 360 * 7 + (270 - targetCenter);
    setRotation(finalRotation);

    const timer = window.setTimeout(onComplete, 4200);
    return () => window.clearTimeout(timer);
  }, [onComplete, slice, spinning, winnerIndex]);

  return (
    <section className="flex w-full max-w-xl flex-col items-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-black text-charcoal shadow-lg backdrop-blur">
        <Sparkles aria-hidden="true" className="h-4 w-4 text-electric" />
        Marshmallow Match Engine
      </div>

      <div className="relative aspect-square w-full max-w-[23rem] rounded-full bg-white p-4 shadow-glow">
        <div className="absolute left-1/2 top-0 z-20 h-12 w-10 -translate-x-1/2 -translate-y-3 [clip-path:polygon(50%_100%,0_0,100%_0)] bg-charcoal shadow-lg" />
        <div
          className="relative h-full w-full rounded-full border-[10px] border-white shadow-inner transition-transform duration-[4000ms] ease-out"
          style={{
            background: `conic-gradient(${gradient})`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {characters.map((character, index) => {
            const angle = index * slice + slice / 2;
            return (
              <div
                key={character.id}
                className="absolute left-1/2 top-1/2 h-1/2 origin-top"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <span
                  className="wheel-slice-label absolute -top-1 left-1/2 max-w-20 -translate-x-1/2 rotate-90 truncate text-[0.62rem] font-black uppercase text-white md:text-xs"
                  title={character.name}
                >
                  {character.name}
                </span>
              </div>
            );
          })}
          <div className="absolute inset-[35%] grid place-items-center rounded-full border-8 border-white bg-charcoal text-center text-sm font-black uppercase leading-tight text-white shadow-xl">
            Spin
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-sm font-bold text-charcoal/70">
        Calculating your anime aura...
      </p>
    </section>
  );
}
