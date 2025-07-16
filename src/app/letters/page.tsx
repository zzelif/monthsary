//src\app\letters\page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Letters {
  slug: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export default function LettersPage() {
  const [letters, setLetters] = useState<Letters[]>([]);

  useEffect(() => {
    fetch("/letters.json")
      .then((res) => res.json())
      .then((data) => {
        setLetters(data);
      })
      .catch((err) => {
        console.error("Failed to load letters.json", err);
      });
  }, []);

  return (
    <div className="px-4 py-10 text-center space-y-8 min-h-screen bg-pink-50">
      <h1 className="text-4xl font-bold text-rose-600">Open When Letters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {letters.map((letter) => (
          <Link
            key={letter.slug}
            href={`/letters/${letter.slug}`}
            className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 hover:bg-rose-50 transition-all"
          >
            <h2 className="text-xl font-semibold text-rose-700">
              {letter.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
