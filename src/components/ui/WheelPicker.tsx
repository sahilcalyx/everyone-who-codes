"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface WheelPickerProps {
  options: string[] | number[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export const WheelPicker: React.FC<WheelPickerProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40; // Standard iOS picker item height
  const visibleItems = 5; // Must be odd
  const offset = Math.floor(visibleItems / 2);

  const [activeIndex, setActiveIndex] = useState(
    options.findIndex((o) => o === value),
  );

  useEffect(() => {
    const index = options.findIndex((o) => o === value);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
      if (containerRef.current) {
        containerRef.current.scrollTop = index * itemHeight;
      }
    }
  }, [value, options]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    if (index !== activeIndex && index >= 0 && index < options.length) {
      setActiveIndex(index);
      onChange(options[index]);
    }
  };

  return (
    <div
      className={cn(
        "relative h-[220px] w-full overflow-hidden bg-white select-none",
        className,
      )}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      {/* Selection Highlight */}
      <div className="absolute top-1/2 left-0 w-full h-[40px] -translate-y-1/2 border-y border-slate-100 bg-slate-50/50 pointer-events-none z-10" />

      {/* The Wheel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide py-[90px]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {options.map((option, index) => {
          const isSelected = index === activeIndex;
          const distance = index - activeIndex;
          const rotateX = distance * -20;
          const opacity = Math.max(0, 1 - Math.abs(distance) * 0.3);
          const scale = 1 - Math.abs(distance) * 0.05;
          const translateY = distance * 2; // Subtle compression

          return (
            <div
              key={`${option}-${index}`}
              onClick={() => {
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    top: index * itemHeight,
                    behavior: "smooth",
                  });
                }
              }}
              className="h-[40px] flex items-center justify-center snap-center cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{
                  opacity,
                  scale,
                  rotateX,
                  y: translateY,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                  "text-base tracking-tight transition-all duration-200",
                  isSelected
                    ? "text-slate-950 font-black"
                    : "text-slate-400 font-medium",
                )}
              >
                {option}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
