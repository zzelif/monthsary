//src\components\card\lettercard.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-pink">
      <div
        className="relative w-[1200px] h-[630px]"
        style={{ perspective: "2000px" }}
      >
        {/* Right Page (Message Content) */}
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-full bg-pink-100 rounded-r-lg shadow-lg p-8 flex flex-col justify-center z-10"
          initial={false}
          animate={{ translateX: isOpen ? "50%" : "0%" }}
          transition={transition}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-left text-gray-800 font-medium space-y-4 font-indie text-base sm:text-xs md:text-sm"
              >
                {[paragraph1, paragraph2, paragraph3].map((text, i) => (
                  <motion.p key={i} custom={i} variants={paragraphVariants}>
                    {text}
                  </motion.p>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <p className="font-semibold">Love,</p>
                  <p className="italic">Dan</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Flipping Cover */}
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-full z-20"
          style={{ transformStyle: "preserve-3d", transformOrigin: "left" }}
          initial={false}
          animate={{
            rotateY: isOpen ? -180 : 0,
            translateX: isOpen ? "50%" : "0%",
          }}
          transition={transition}
        >
          {/* Front Cover */}
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
              className="row-start-[-1] place-self-end flex items-center justify-between w-48 px-4 py-2 bg-black text-white rounded-md text-sm group sm:w-1/2"
            >
              Click to Open Card!
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </button>
          </div>

          {/* Back of the Cover (Image) */}
          <div
            className="absolute w-full h-full bg-pink-100 shadow-lg p-8 grid grid-rows-3"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.div
              className="row-start-2 place-self-center flex justify-center text-center bg-white p-4 pb-12 rounded-sm shadow-md rotate-[-2deg] sm:w-4/6 lg:w-full md:w-3/4"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={image}
                alt={image}
                width={300}
                height={225}
                className="object-cover"
              />
            </motion.div>

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
