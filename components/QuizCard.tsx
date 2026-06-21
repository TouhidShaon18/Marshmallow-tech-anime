"use client";

import { ChevronRight } from "lucide-react";
import type { Question, QuizOption } from "@/lib/quiz-data";

type QuizCardProps = {
  question: Question;
  current: number;
  total: number;
  selected?: number;
  onSelect: (option: QuizOption, index: number) => void;
};

export function QuizCard({
  question,
  current,
  total,
  selected,
  onSelect,
}: QuizCardProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <section className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-glow backdrop-blur md:p-7">
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-sm font-bold text-charcoal/70">
          <span>Question {current + 1}</span>
          <span>{current + 1}/{total}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-charcoal/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink via-lavender to-electric transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-black leading-tight text-charcoal md:text-3xl">
        {question.prompt}
      </h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((option, index) => {
          const active = selected === index;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onSelect(option, index)}
              className={`group flex min-h-20 items-center justify-between gap-4 rounded-3xl border p-4 text-left transition duration-200 ${
                active
                  ? "border-electric bg-electric text-white shadow-blue"
                  : "border-charcoal/10 bg-white hover:-translate-y-0.5 hover:border-lavender hover:shadow-lg"
              }`}
            >
              <span>
                <span
                  className={`block text-sm font-black uppercase tracking-wide ${
                    active ? "text-white/80" : "text-electric"
                  }`}
                >
                  {option.label}
                </span>
                <span className="mt-1 block text-base font-bold leading-snug">
                  {option.text}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 transition ${
                  active ? "translate-x-1 text-white" : "text-charcoal/40 group-hover:translate-x-1"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
