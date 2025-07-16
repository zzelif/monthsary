//app/components/ui/content.tsx

import { motion } from "framer-motion";
import HeartTreeCanvas from "@/components/ui/treecanvas";
import Message from "@/components/message";

const Content = () => {
  return (
    <section
      id="main"
      className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16 select-none"
    >
      <motion.div>
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-pink-600 font-script"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Happy Monthsary, Adi 💖
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-10/12 text-gray-700 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Another month of laughs, growth, cuddles, and infinite love. I&apos;m
          grateful for every second with you.
        </motion.p>
      </motion.div>
      {/* tree grows from a base upwards with branches then blooms with hearts  */}
      <motion.div>
        <HeartTreeCanvas />
        <Message />
      </motion.div>
    </section>
  );
};

export default Content;
