"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [score, setScore] = useState<number | null>(null);

  function calculateScore(text: string) {
    const t = text.toLowerCase();
    let s = 50;

    if (t.includes("ai") || t.includes("tech") || t.includes("startup")) s += 20;
    if (t.includes("crypto")) s += 25;
    if (t.includes("debt") || t.includes("loan")) s += 15;
    if (t.includes("stable") || t.includes("bond")) s -= 20;

    if (s > 100) s = 100;
    if (s < 0) s = 0;

    return s;
  }

  function handleClick() {
    if (!input) return;
    const result = calculateScore(input);
    setScore(result);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        KI Neuro Investor Tool
      </h1>

      <textarea
        className="w-full max-w-md border p-2 mb-4"
        placeholder="Beschreibe deine Investment-Idee..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleClick}
      >
        Bewerten
      </button>

      {score !== null && (
        <p className="mt-4 text-lg">
          Risiko-Score: {score} / 100
        </p>
      )}
    </div>
  );
}
