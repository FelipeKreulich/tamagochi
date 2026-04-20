"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { beepAction, beepError, beepSuccess, melodyAchievement } from "@/lib/audio";
import { tpl, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SimonGameProps {
  muted: boolean;
  onFinish: (result: { happiness: number; coins: number; won: boolean }) => void;
}

type Phase = "idle" | "watch" | "input" | "over";

const PAD_COUNT = 4;
const PAD_COLORS = [
  "bg-lcd-light",
  "bg-accent-pink",
  "bg-accent-cyan",
  "bg-[var(--chart-4)]",
];
const PAD_FREQS = [523, 659, 784, 988]; // C E G B
const MAX_ROUNDS = 8;

export function SimonGame({ muted, onFinish }: SimonGameProps) {
  const dict = useT();
  const [phase, setPhase] = useState<Phase>("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [inputIdx, setInputIdx] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const playPad = (i: number) => {
    setLit(i);
    beepAction({ muted });
    try {
      const AudioCtor =
        typeof window !== "undefined"
          ? window.AudioContext ??
            (window as Window & { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext
          : undefined;
      if (AudioCtor && !muted) {
        const ctx = new AudioCtor();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = PAD_FREQS[i];
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setLit(null), 280);
    timeoutsRef.current.push(t);
  };

  const playSequence = useCallback(
    (seq: number[]) => {
      setPhase("watch");
      clearTimers();
      seq.forEach((idx, i) => {
        const t = window.setTimeout(() => playPad(idx), 500 + i * 560);
        timeoutsRef.current.push(t);
      });
      const doneAt = 500 + seq.length * 560 + 120;
      const finishT = window.setTimeout(() => {
        setInputIdx(0);
        setPhase("input");
      }, doneAt);
      timeoutsRef.current.push(finishT);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [muted]
  );

  const nextRound = useCallback(() => {
    setSequence((prev) => {
      const next = [...prev, Math.floor(Math.random() * PAD_COUNT)];
      window.setTimeout(() => playSequence(next), 50);
      return next;
    });
  }, [playSequence]);

  const startGame = () => {
    setSequence([]);
    setInputIdx(0);
    setWon(false);
    nextRound();
  };

  const handlePadClick = (i: number) => {
    if (phase !== "input") return;
    playPad(i);
    const expected = sequence[inputIdx];
    if (i !== expected) {
      beepError({ muted });
      setPhase("over");
      setWon(false);
      return;
    }
    const nextInput = inputIdx + 1;
    if (nextInput >= sequence.length) {
      beepSuccess({ muted });
      if (sequence.length >= MAX_ROUNDS) {
        melodyAchievement({ muted });
        setPhase("over");
        setWon(true);
      } else {
        setInputIdx(0);
        const t = window.setTimeout(() => nextRound(), 700);
        timeoutsRef.current.push(t);
      }
    } else {
      setInputIdx(nextInput);
    }
  };

  const rounds = Math.max(0, sequence.length - (phase === "over" && !won ? 1 : 0));
  const coins = rounds * 2;
  const happiness = Math.min(40, rounds * 4);

  const endAndReport = () => onFinish({ happiness, coins, won });

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[9px] uppercase tracking-widest text-accent-cyan">
        {phase === "watch"
          ? dict.simon.watch
          : phase === "input"
          ? dict.simon.yourTurn
          : phase === "over"
          ? won
            ? dict.simon.victory
            : dict.simon.gameOver
          : dict.simon.subtitle}
      </p>
      <p className="text-[8px] uppercase tracking-widest text-lcd-light/70">
        {tpl(dict.simon.round, { n: sequence.length || 1 })}
      </p>

      <div className="grid w-full max-w-[220px] grid-cols-2 gap-2">
        {Array.from({ length: PAD_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            disabled={phase !== "input"}
            onClick={() => handlePadClick(i)}
            className={cn(
              "aspect-square border-4 border-lcd-dark opacity-50 transition-opacity disabled:opacity-30",
              PAD_COLORS[i],
              lit === i && "opacity-100 animate-[lcdflicker_0.2s_steps(2)]",
              phase === "input" && "cursor-pointer hover:opacity-80"
            )}
            aria-label={`Pad ${i + 1}`}
          />
        ))}
      </div>

      {phase === "idle" && (
        <button
          type="button"
          onClick={startGame}
          className="border-2 border-lcd-light bg-lcd-light px-4 py-2 text-[9px] uppercase tracking-widest text-lcd-dark"
        >
          {dict.simon.start}
        </button>
      )}

      {phase === "over" && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-[9px] uppercase tracking-widest text-accent-pink">
            {tpl(dict.simon.earned, { coins })}
          </p>
          <button
            type="button"
            onClick={endAndReport}
            className="border-2 border-lcd-light bg-lcd-light px-4 py-2 text-[9px] uppercase tracking-widest text-lcd-dark"
          >
            {dict.common.continue}
          </button>
        </div>
      )}
    </div>
  );
}
