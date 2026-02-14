"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { RegistrationModal } from "@/components/modals/RegistrationModal";
import { ContactModal } from "@/components/modals/ContactModal";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2">
        <div className="flex-shrink-0">
          <img
            src="https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp"
            alt="Everyone Who Codes Logo"
            className="h-10 sm:h-16 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <RegistrationModal>
            <button
              className="px-3 sm:px-6 py-2 bg-primary hover:brightness-105 text-white font-black uppercase text-[10px] sm:text-xs tracking-tighter sm:tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all border-none italic whitespace-nowrap"
            >
              Reserve Spot
            </button>
          </RegistrationModal>
          <ContactModal>
            <button
              className="px-3 sm:px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 whitespace-nowrap"
            >
              Contact Us
            </button>
          </ContactModal>
        </div>
      </div>
    </motion.header>
  );
}
