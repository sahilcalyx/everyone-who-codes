"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCard({ 
  className, 
  children, 
  delay = 0 
}: { 
  className?: string; 
  children: React.ReactNode; 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-white/70 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function StatMiniCard({ icon: Icon, label, value, colorClass }: { icon: any, label: string, value: string, colorClass: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg", colorClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{label}</div>
        <div className="text-sm font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

export function BackgroundElement() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-emerald-200/20 blur-[150px] rounded-full"
      />
    </div>
  );
}
