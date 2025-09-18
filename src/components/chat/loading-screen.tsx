"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DropletAvatar from "./droplet-avatar";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Simulated progress for UX
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 8, 100));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated droplet container */}
      <div className="relative mb-10">
        {/* Light halo with enhanced effect */}
        <motion.div
          className="absolute inset-0 bg-blue-300/20 rounded-full blur-xl scale-150"
          animate={{
            scale: [1.5, 1.8, 1.5],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />

        {/* Main animated droplet */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <DropletAvatar
            mood="processing"
            size="lg"
            pulse={true}
          />
        </motion.div>

        {/* Ripple rings with enhanced effects */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-300/40 scale-110"
          animate={{ scale: [1.1, 2, 1.1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-300/30 scale-110"
          animate={{ scale: [1.1, 2, 1.1], opacity: [0.3, 0, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Initialization text with improved styling */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-xl text-center text-white shadow-md">
          <h3 className="text-xl font-medium">
            Initializing H₂O Allegiant AI
          </h3>
          <p className="text-blue-100 mt-1">
            Preparing water engineering models...
          </p>
        </div>
      </motion.div>

      {/* Progress bar with water effect */}
      <div className="w-64 relative">
        <div className="h-2 bg-white/50 rounded-full overflow-hidden shadow-inner border border-blue-100">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full relative overflow-hidden"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg]"
              animate={{ x: [-80, 260] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
            />
          </motion.div>
        </div>

        {/* Percentage */}
        <div className="mt-2 text-sm text-blue-600 text-center">
          {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
}
