import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type DropletMood = 'default' | 'thinking' | 'happy' | 'explaining' | 'processing';

interface DropletAvatarProps {
  mood?: DropletMood;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

/**
 * Enhanced Droplet Avatar component that represents the H2O Allegiant AI assistant
 * with improved animations and visual effects
 */
export default function DropletAvatar({
  mood = 'default',
  size = 'md',
  className,
  animate = true,
  pulse = false
}: DropletAvatarProps) {
  const [randomOffset, setRandomOffset] = useState(0);

  // Generate a small random offset for wave animations to make them more natural
  useEffect(() => {
    if (animate) {
      setRandomOffset(Math.random() * 0.5);
    }
  }, [animate]);

  // Size mappings
  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-20 w-20'
  };

  // Different expressions based on mood using motion for smoother transitions
  const renderFace = () => {
    switch (mood) {
      case 'thinking':
        return (
          <motion.g
            className="droplet-face"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Thinking eyes (slightly closed) with subtle movement */}
            <motion.ellipse
              cx="9" cy="9" rx="1.5" ry="1" fill="white"
              animate={{ ry: [1, 0.8, 1], opacity: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="15" cy="9" rx="1.5" ry="1" fill="white"
              animate={{ ry: [1, 0.8, 1], opacity: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Thinking mouth (slight movement) */}
            <motion.path
              d="M10 15.5C11.5 17 13.5 17 15 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: ["M10 15.5C11.5 17 13.5 17 15 15.5", "M10 15.8C11.5 17.2 13.5 17.2 15 15.8", "M10 15.5C11.5 17 13.5 17 15 15.5"]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            {/* Small bubble thoughts with better animation */}
            <motion.circle
              cx="18" cy="4" r="1" fill="white" fillOpacity="0.8"
              animate={{
                y: [-2, -6, -2],
                opacity: [0.8, 0.5, 0.8],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.circle
              cx="20" cy="2" r="1.5" fill="white" fillOpacity="0.6"
              animate={{
                y: [-1, -4, -1],
                opacity: [0.6, 0.3, 0.6],
                scale: [1, 1.3, 1]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.g>
        );

      case 'happy':
        return (
          <motion.g
            className="droplet-face"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Happy eyes (curved upward) with subtle animation */}
            <motion.path
              d="M7.5 8.5C8.5 7.5 10 7.5 9.5 9"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: ["M7.5 8.5C8.5 7.5 10 7.5 9.5 9", "M7.5 8C8.5 7 10 7 9.5 8.7", "M7.5 8.5C8.5 7.5 10 7.5 9.5 9"]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M14.5 8.5C15.5 7.5 17 7.5 16.5 9"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: ["M14.5 8.5C15.5 7.5 17 7.5 16.5 9", "M14.5 8C15.5 7 17 7 16.5 8.7", "M14.5 8.5C15.5 7.5 17 7.5 16.5 9"]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Happy mouth (animated smile) */}
            <motion.path
              d="M8 14C10 17 14 17 16 14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: ["M8 14C10 17 14 17 16 14", "M8 13.5C10 17.2 14 17.2 16 13.5", "M8 14C10 17 14 17 16 14"]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            {/* Animated sparkles */}
            <motion.path
              d="M19 6L20 7M19 7L20 6"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M4 6L5 7M4 7L5 6"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.g>
        );

      case 'explaining':
        return (
          <motion.g
            className="droplet-face"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Explaining eyes (wide open, attentive) with subtle blinking */}
            <motion.circle
              cx="9" cy="9" r="2" fill="white"
              animate={{
                ry: [2, 0.5, 2],
                y: [0, 0.2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.03, 0.06],
                repeatDelay: 3.94
              }}
            />
            <motion.circle
              cx="15" cy="9" r="2" fill="white"
              animate={{
                ry: [2, 0.5, 2],
                y: [0, 0.2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.03, 0.06],
                repeatDelay: 3.94,
                delay: 0.1
              }}
            />

            {/* Explaining mouth (talking) with animation */}
            <motion.ellipse
              cx="12" cy="15" rx="3" ry="2" fill="white"
              animate={{
                ry: [2, 1.5, 2, 1.2, 2],
                opacity: [1, 0.9, 1, 0.95, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />

            {/* Little speech lines */}
            <motion.path
              d="M19 10C21 8 21 12 19 11"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                opacity: [1, 0.4, 1],
                x: [0, 0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />

            <motion.path
              d="M4 10C2 8 2 12 4 11"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                opacity: [1, 0.4, 1],
                x: [0, -0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.g>
        );

      case 'processing':
        return (
          <motion.g
            className="droplet-face"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Processing eyes (circular motion) - using manual animation for better control */}
            <motion.circle
              cx="9" cy="9" r="1.5" fill="white"
              animate={{
                cx: [9, 9.5, 9, 8.5, 9],
                cy: [9, 8.5, 9, 9.5, 9]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <motion.circle
              cx="15" cy="9" r="1.5" fill="white"
              animate={{
                cx: [15, 14.5, 15, 15.5, 15],
                cy: [9, 9.5, 9, 8.5, 9]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />

            {/* Processing mouth (pulsing) */}
            <motion.rect
              x="9" y="15" width="6" height="1.5" rx="0.75" fill="white"
              animate={{
                width: [6, 4, 6],
                x: [9, 10, 9]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Data processing dots with coordinated animation */}
            <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 3 }}>
              <motion.circle
                cx="5" cy="7" r="1" fill="white" fillOpacity="0.6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0 }}
              />
              <motion.circle
                cx="3.5" cy="10" r="1" fill="white" fillOpacity="0.6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              />
              <motion.circle
                cx="5" cy="13" r="1" fill="white" fillOpacity="0.6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
              />
              <motion.circle
                cx="19" cy="7" r="1" fill="white" fillOpacity="0.6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
              />
              <motion.circle
                cx="20.5" cy="10" r="1" fill="white" fillOpacity="0.6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
              <motion.circle
                cx="19" cy="13" r="1" fill="white" fillOpacity="0.6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
              />
            </motion.g>
          </motion.g>
        );

      case 'default':
      default:
        return (
          <motion.g
            className="droplet-face"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Default eyes with subtle blinking */}
            <motion.circle
              cx="9" cy="9" r="1.8" fill="white"
              animate={{
                ry: [1.8, 0.4, 1.8],
                y: [0, 0.2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.02, 0.04],
                repeatDelay: 4.96
              }}
            />
            <motion.circle
              cx="15" cy="9" r="1.8" fill="white"
              animate={{
                ry: [1.8, 0.4, 1.8],
                y: [0, 0.2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.02, 0.04],
                repeatDelay: 4.96,
                delay: 0.1
              }}
            />

            {/* Default mouth (slight smile) with subtle animation */}
            <motion.path
              d="M9 14.5C10.5 16 13.5 16 15 14.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: ["M9 14.5C10.5 16 13.5 16 15 14.5", "M9 14.7C10.5 16.3 13.5 16.3 15 14.7", "M9 14.5C10.5 16 13.5 16 15 14.5"]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
          </motion.g>
        );
    }
  };

  return (
    <div className={cn(
      "relative group",
      sizeClasses[size],
      className
    )}>
      {/* Enhanced glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-radial from-blue-400/30 to-transparent"
        )}
        animate={{
          scale: pulse ? [1, 1.4, 1] : 1,
          opacity: pulse ? [0.3, 0, 0.3] : 0.3
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className={cn(
          "relative h-full w-full",
          "flex items-center justify-center",
          "rounded-full overflow-hidden",
          "shadow-lg"
        )}
        initial={{ scale: 0.95 }}
        animate={{
          scale: 1,
          background: mood === 'happy'
            ? "linear-gradient(135deg, #38bdf8, #0284c7)"
            : mood === 'processing'
              ? "linear-gradient(135deg, #0284c7, #075985)"
              : "linear-gradient(135deg, #38bdf8, #0284c7)"
        }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Enhanced water waves animation inside the droplet */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 w-full h-[40%] bg-white/10 rounded-t-full"
            animate={{
              y: animate ? [0, -4, 0] : 0,
              scaleY: animate ? [1, 1.1, 1] : 1
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            style={{ animationDelay: `${randomOffset}s` }}
          />

          <motion.div
            className="absolute bottom-0 w-full h-[25%] bg-white/10 rounded-t-full"
            animate={{
              y: animate ? [0, -3, 0] : 0,
              scaleY: animate ? [1, 1.2, 1] : 1
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{ animationDelay: `${0.2 + randomOffset}s` }}
          />

          {/* Additional subtle wave */}
          <motion.div
            className="absolute bottom-0 w-full h-[15%] bg-white/5 rounded-t-full"
            animate={{
              y: animate ? [0, -2, 0] : 0,
              scaleY: animate ? [1, 1.3, 1] : 1
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
            style={{ animationDelay: `${0.7 + randomOffset}s` }}
          />
        </div>

        {/* Droplet SVG with face */}
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer droplet shape (invisible, just for proper viewBox sizing) */}
          <path
            d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
            fill="none"
            strokeOpacity="0"
          />

          {/* Inner highlight effect */}
          <motion.path
            d="M12 5.5l3.5 3.5a5 5 0 1 1-7 0z"
            fill="white"
            fillOpacity="0.15"
            animate={{
              fillOpacity: [0.15, 0.25, 0.15],
              d: animate ? [
                "M12 5.5l3.5 3.5a5 5 0 1 1-7 0z",
                "M12 5l3.7 3.7a5.2 5.2 0 1 1-7.4 0z",
                "M12 5.5l3.5 3.5a5 5 0 1 1-7 0z"
              ] : "M12 5.5l3.5 3.5a5 5 0 1 1-7 0z"
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />

          {/* Render the face based on mood */}
          {renderFace()}
        </svg>
      </motion.div>

      {/* Enhanced decorative water particles */}
      <motion.div
        className="absolute -top-1 -left-1 h-2 w-2 bg-blue-200/80 rounded-full"
        animate={{
          y: animate ? [-2, -6, -2] : 0,
          x: animate ? [-2, 1, -2] : 0,
          opacity: animate ? [0.8, 0.4, 0.8] : 0.8,
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-0 -right-1 h-2.5 w-2.5 bg-blue-300/70 rounded-full"
        animate={{
          y: animate ? [0, -4, 0] : 0,
          x: animate ? [0, 2, 0] : 0,
          opacity: animate ? [0.7, 0.3, 0.7] : 0.7,
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Additional micro-bubble */}
      <motion.div
        className="absolute top-1/2 left-[-10px] h-1.5 w-1.5 bg-blue-400/30 rounded-full"
        animate={{
          y: animate ? [-5, -15, -5] : 0,
          opacity: animate ? [0.3, 0, 0.3] : 0.3,
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}
