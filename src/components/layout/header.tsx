"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-center py-6">
      <div className="relative inline-block text-left">
        {/* Animated Icon Button */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Smooth Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-fit origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            >
              <div className="py-1">
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/letters"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                  onClick={() => setOpen(false)}
                >
                  Letters
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
