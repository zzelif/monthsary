// components/floating-hearts.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

const HEART_COUNT = 12;
const HEART_COLORS = ["#FFB6C1", "#FFDAB9", "#FFC0CB", "#FF69B4", "#FF1493"];

const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: HEART_COUNT }).map((_, i) => {
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 2;
        const startX = Math.random() * 100;
        const endXOffset = (Math.random() - 0.5) * 50;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              bottom: "-20px",
              color:
                HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
              fontSize: `${Math.random() * 10 + 10}px`,
              opacity: Math.random() * 0.4 + 0.3,
            }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: ["0%", "-100vh"],
              x: [0, endXOffset],
              opacity: [0, 0.3, 0.5, 0.3, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            &#x2764;&#xFE0F;&#x1F33B;
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingHearts;
