"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToInvestment = () => {
    const section = document.getElementById("investment");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent py-4",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp"
            alt="Everyone Who Codes Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
        <Button
          onClick={scrollToInvestment}
          size="sm"
          className="bg-primary hover:brightness-105 text-primary-foreground shadow-md hover:shadow-lg transition-all"
        >
          Reserve Your Spot
        </Button>
      </div>
    </motion.header>
  );
}
