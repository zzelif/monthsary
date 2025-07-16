"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import Masonry from "@/components/ui'/masonry";

interface Memory {
  img: string;
  caption: string;
}

export default function Story() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    fetch("/messages.json")
      .then((res) => res.json())
      .then((data) => {
        setMemories(data.memories);
      })
      .catch((err) => {
        console.error("Failed to load memories.json", err);
      });
  }, []);

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className=" px-6 py-20 text-center"
    >
      <h2 className="text-3xl font-bold text-pink-500 mb-10">
        Some of our firsts
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {memories.map((item, i) => (
          <motion.div
            key={i}
            className="bg-pink-100 rounded-xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={item.img}
              alt={item.caption}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-lg font-semibold">{item.caption}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
