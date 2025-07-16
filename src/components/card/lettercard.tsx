//src\components\card\lettercard.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image: string;
}

export default function LetterFlipCard({
  title,
  paragraph1,
  paragraph2,
  paragraph3,
  image,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleFlip = () => setIsOpen(!isOpen);

  const transition = { duration: 1, ease: [0.42, 0, 0.58, 1] as const };

  return (
    // Wrapper to center the card in the viewport
    <div className="w-full h-full flex items-center justify-center bg-pink">
      {/* The perspective "stage" for the card */}
      <div
        className="relative w-[1200px] h-[630px]"
        style={{ perspective: "2000px" }}
      >
        {/* Animated Inside-Right Page (The Message) */}
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-full bg-pink-100 rounded-r-lg shadow-lg p-8 flex flex-col justify-center z-10"
          initial={false}
          animate={{
            translateX: isOpen ? "50%" : "0%", // Moves right on open
          }}
          transition={transition}
        >
          <div className="text-left text-gray-800 text-base font-medium space-y-4 font-indie">
            <motion.p>{paragraph1}</motion.p>
            <motion.p>{paragraph2}</motion.p>
            <motion.p>{paragraph3}</motion.p>
            <div className="pt-4">
              <p className="font-semibold">Love</p>
              <p className="italic">Dan</p>
            </div>
          </div>
        </motion.div>

        {/* Flipping Cover */}
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-full z-20"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left",
          }}
          initial={false}
          animate={{
            rotateY: isOpen ? -180 : 0,
            translateX: isOpen ? "50%" : "0%", // Stays put, just rotates
          }}
          transition={transition}
        >
          {/* Front of the Cover */}
          <div
            className="absolute w-full h-full bg-[#E86A6A] shadow-xl p-8 grid grid-rows-3"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h1
              className="row-start-2 place-self-center text-center text-5xl font-bold text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: "3px 3px 5px rgba(0,0,0,0.2)",
              }}
            >
              {title}
            </h1>
            <button
              onClick={handleFlip}
              className="row-start-[-1] place-self-end flex items-center justify-between w-48 px-4 py-2 bg-black text-white rounded-md text-sm group sm:w-1/2 xs"
            >
              Click to Open Card!
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </button>
          </div>

          {/* Back of the Cover (Inside-Left with Photo) */}
          <div
            className="absolute w-full h-full bg-pink-100 shadow-lg p-8 grid grid-rows-3"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="row-start-2 place-self-center text-center bg-white p-4 pb-12 rounded-sm shadow-md rotate-[-2deg] sm:w-1/2 lg:w-full md:w-3/4">
              <Image
                src={image}
                alt={image}
                width={300}
                height={225}
                className="object-cover"
              />
            </div>
            <button
              onClick={handleFlip}
              className="row-start-[-1] place-self-start flex items-center justify-between w-48 px-4 py-2 bg-black text-white rounded-md text-sm group sm:w-1/2"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
                &lt;
              </span>
              Click to Close Card!
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
