"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { QuizCard } from "@/components/QuizCard";
import { ResultCard } from "@/components/ResultCard";
import { SpinWheel } from "@/components/SpinWheel";
import {
  addScores,
  characters,
  emptyScores,
  getCharacterMatch,
  questions,
  type Character,
  type Question,
  type QuizOption,
  type TraitScores,
} from "@/lib/quiz-data";

type Stage = "name" | "quiz" | "spin" | "result";

const DAILY_RESULT_LIMIT = 2;
const QUESTION_COUNT = 5;
const DAILY_LIMIT_STORAGE_KEY = "marshmallow-anime-quiz-daily-results";

type MatchResult = {
  character: Character;
  percentage: number;
};

type DailyUsage = {
  date: string;
  count: number;
};

function getTodayKey() {
  return new Date().toLocaleDateString("en-CA");
}

function pickDailyQuestions() {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, QUESTION_COUNT);
}

function readDailyUsage(): DailyUsage {
  try {
    const rawUsage = window.localStorage.getItem(DAILY_LIMIT_STORAGE_KEY);
    const today = getTodayKey();

    if (!rawUsage) {
      return { date: today, count: 0 };
    }

    const usage = JSON.parse(rawUsage) as DailyUsage;
    return usage.date === today ? usage : { date: today, count: 0 };
  } catch {
    return { date: getTodayKey(), count: 0 };
  }
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("name");
  const [name, setName] = useState("");
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(() =>
    questions.slice(0, QUESTION_COUNT),
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [scores, setScores] = useState<TraitScores>(emptyScores);
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [resultsUsedToday, setResultsUsedToday] = useState(0);
  const [limitMessage, setLimitMessage] = useState("");
  const resultCardRef = useRef<HTMLDivElement>(null);

  const displayName = name.trim() || "Fan";
  const remainingResults = Math.max(0, DAILY_RESULT_LIMIT - resultsUsedToday);

  useEffect(() => {
    setResultsUsedToday(readDailyUsage().count);
    setActiveQuestions(pickDailyQuestions());
  }, []);

  function startQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }
    const usage = readDailyUsage();
    setResultsUsedToday(usage.count);

    if (usage.count >= DAILY_RESULT_LIMIT) {
      setLimitMessage("You can generate 2 anime results per day. Come back tomorrow for a fresh match.");
      return;
    }

    setLimitMessage("");
    setActiveQuestions(pickDailyQuestions());
    setCurrentQuestion(0);
    setSelectedOption(undefined);
    setScores(emptyScores);
    setMatch(null);
    setStage("quiz");
  }

  function recordResultGeneration() {
    const usage = readDailyUsage();
    const nextUsage = {
      date: usage.date,
      count: Math.min(DAILY_RESULT_LIMIT, usage.count + 1),
    };

    window.localStorage.setItem(DAILY_LIMIT_STORAGE_KEY, JSON.stringify(nextUsage));
    setResultsUsedToday(nextUsage.count);
  }

  function answerQuestion(option: QuizOption, optionIndex: number) {
    setSelectedOption(optionIndex);
    const nextScores = addScores(scores, option.scores);

    window.setTimeout(() => {
      if (currentQuestion === activeQuestions.length - 1) {
        const result = getCharacterMatch(nextScores);
        setScores(nextScores);
        setMatch(result);
        recordResultGeneration();
        setStage("spin");
      } else {
        setScores(nextScores);
        setCurrentQuestion((question) => question + 1);
        setSelectedOption(undefined);
      }
    }, 280);
  }

  const revealResult = useCallback(() => {
    setStage("result");
    confetti({
      particleCount: 150,
      spread: 75,
      origin: { y: 0.65 },
      colors: ["#CBA6F7", "#3B82F6", "#FFB6C1", "#FFFFFF", "#2E2E2E"],
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#CBA6F7", "#3B82F6", "#FFB6C1"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#CBA6F7", "#3B82F6", "#FFB6C1"],
      });
    }, 260);
  }, []);

  async function downloadCard() {
    if (!resultCardRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);
    try {
      const canvas = await renderResultCard();
      const link = document.createElement("a");
      link.download = `${displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-anime-match.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }

  async function renderResultCard() {
    if (!resultCardRef.current) {
      throw new Error("Result card is not ready yet.");
    }

    const html2canvas = (await import("html2canvas")).default;
    return html2canvas(resultCardRef.current, {
      backgroundColor: "#FFFFFF",
      scale: 2,
      useCORS: true,
      allowTaint: false,
    });
  }

  async function shareOnFacebook() {
    const text = match
      ? `${displayName} matched with ${match.character.name} at ${match.percentage}% on Marshmallow Tech's anime quiz. Built for Fans. By Fans.`
      : "I found my anime match on Marshmallow Tech.";
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://marshmallow.tech";
    try {
      const canvas = await renderResultCard();
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        throw new Error("Could not generate share image.");
      }

      const file = new File(
        [blob],
        `${displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-anime-match.png`,
        { type: "image/png" },
      );

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "My Marshmallow Tech Anime Match",
          text,
          files: [file],
        });
        return;
      }
    } catch {
      // Fall back to Facebook's web share dialog when direct image sharing is unavailable.
    }

    const url = new URL("https://www.facebook.com/sharer/sharer.php");
    url.searchParams.set("u", shareUrl);
    url.searchParams.set("quote", text);
    url.searchParams.set("hashtag", "#MarshmallowTech");
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }

  function retakeQuiz() {
    setStage("name");
    setActiveQuestions(pickDailyQuestions());
    setCurrentQuestion(0);
    setSelectedOption(undefined);
    setScores(emptyScores);
    setMatch(null);
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 text-charcoal sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4 py-3">
          <a href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/85 p-1.5 shadow-lg backdrop-blur">
              <Image
                src="/brand/marshmallow-logo.png"
                alt="Marshmallow Tech logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-charcoal">
                Marshmallow Tech
              </span>
              <span className="block text-xs font-bold text-charcoal/55">
                Built for Fans. By Fans.
              </span>
            </span>
          </a>
          <a
            href="/anime-collection"
            className="hidden rounded-2xl bg-white/75 px-4 py-3 text-sm font-black text-charcoal shadow-lg backdrop-blur transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Build My Setup
          </a>
        </header>

        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-10">
          <section className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-black text-charcoal shadow-lg backdrop-blur">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-electric" />
              Anime Aura Quiz
            </div>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[0.95] text-charcoal sm:text-6xl lg:text-7xl">
              Which Anime Character Are You?
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-charcoal/70">
              Enter your name, choose your instincts, and let the Marshmallow Tech match engine reveal your anime alter ego.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["5 questions", `${remainingResults}/2 today`, "Spin reveal"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-charcoal shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            {stage === "name" && (
              <form
                onSubmit={startQuiz}
                className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-glow backdrop-blur md:p-7"
              >
                <label htmlFor="name" className="text-sm font-black uppercase tracking-[0.18em] text-electric">
                  Name your main character
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Type your name"
                  className="mt-4 h-16 w-full rounded-3xl border border-charcoal/10 bg-white px-5 text-xl font-black text-charcoal outline-none transition placeholder:text-charcoal/30 focus:border-electric focus:ring-4 focus:ring-electric/15"
                  maxLength={28}
                />
                <button
                  type="submit"
                  disabled={!name.trim() || remainingResults === 0}
                  className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-3xl bg-charcoal px-5 py-4 text-base font-black text-white shadow-blue transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                >
                  Start Quiz
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </button>
                <p className="mt-4 text-center text-sm font-bold text-charcoal/60">
                  {limitMessage || `${remainingResults} result ${remainingResults === 1 ? "generation" : "generations"} left today.`}
                </p>
              </form>
            )}

            {stage === "quiz" && (
              <QuizCard
                question={activeQuestions[currentQuestion]}
                current={currentQuestion}
                total={activeQuestions.length}
                selected={selectedOption}
                onSelect={answerQuestion}
              />
            )}

            {stage === "spin" && match && (
              <SpinWheel
                characters={characters}
                winnerId={match.character.id}
                spinning
                onComplete={revealResult}
              />
            )}

            {stage === "result" && match && (
              <ResultCard
                name={displayName}
                character={match.character}
                percentage={match.percentage}
                cardRef={resultCardRef}
                onDownload={downloadCard}
                onShare={shareOnFacebook}
                onRetake={retakeQuiz}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
