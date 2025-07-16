"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Letters {
  slug: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export default function LettersPage() {
  const [letters, setLetters] = useState<Letters[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [targetSlug, setTargetSlug] = useState<string | null>(null);
  const router = useRouter();

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

  const handleCardClick = (slug: string) => {
    setTargetSlug(targetSlug);
    setIsExiting(true);

    setTimeout(() => {
      router.push(`/letters/${slug}`);
    }, 1000); // match animation duration
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="letters-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          className="px-4 py-10 text-center space-y-8 min-h-screen bg-pink-50"
        >
          <h1 className="text-4xl font-bold text-rose-600">
            Open When Letters
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {letters.map((letter) => (
              <motion.button
                key={letter.slug}
                onClick={() => handleCardClick(letter.slug)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white shadow-lg p-6 rounded-xl transition-all w-full text-left"
              >
                <h2 className="text-xl font-semibold text-rose-700">
                  {letter.title}
                </h2>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {isExiting && (
        <motion.div
          key="fade-out"
          className="fixed inset-0 bg-pink-50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-rose-600 font-bold text-2xl flex items-center gap-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.svg
              className="w-6 h-6 text-rose-500 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582M20 20v-5h-.581M4 20h5v-.582M20 4h-5v.582"
              />
            </motion.svg>
            Loading love...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
