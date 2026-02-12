"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  Target,
  Bot,
  MessageSquare,
  Zap,
  GraduationCap,
  Briefcase,
  Code,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

function BentoTile({
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      className={cn(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg ",
        "bg-slate-900 shadow-sm ring-1 ring-white/10",
      )}
    >
      <div className="relative h-[24rem] lg:h-[26rem] shrink-0 ">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-50% opacity-25" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-50% opacity-25 " />
        )}
      </div>
      <div className="relative p-8 lg:p-10 z-20 isolate mt-[-100px] h-[12rem] lg:h-[14rem] backdrop-blur-xl text-white ">
        <h4 className="text-primary font-bold text-xs uppercase tracking-widest">
          {eyebrow}
        </h4>
        <p className="mt-1 text-xl lg:text-2xl/8 font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-xs lg:text-sm/6 text-slate-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function IdentityCard({
  index,
  title,
  description,
  icon: Icon,
}: {
  index: number;
  title: string;
  description: string;
  icon: any;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-10 lg:p-14 border-slate-100 last:border-0 md:border-r md:last:border-r-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(1)]:border-b md:[&:nth-child(2)]:border-b border-b last:border-b-0 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(122, 218, 165, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col gap-8">
        <div className="absolute -top-6 -right-4 text-[12rem] font-black text-slate-900/[0.02] select-none -z-10 group-hover:text-primary/[0.05] transition-colors duration-700 font-mono leading-none">
          {index + 1}
        </div>
        
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(122,218,165,0.2)] transition-all duration-500">
          <Icon className="h-10 w-10 text-slate-400 group-hover:text-primary transition-colors duration-500" />
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl lg:text-4xl font-black text-slate-950 tracking-tighter leading-tight uppercase italic">
            {title}
          </h3>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-sm">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="h-0.5 w-10 bg-primary rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Identity Profile</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const whoIsFor = [
    {
      icon: GraduationCap,
      title: "Engineering Students & New Graduates",
      description:
        "Starting your career? Learn what companies actually look for.",
    },
    {
      icon: Briefcase,
      title: "Early to Mid-Career Engineers",
      description:
        "Ready to level up? Master the skills that get you promoted.",
    },
    {
      icon: Code,
      title: "Software, Data, ML & AI Roles",
      description: "Targeting tech roles? Understand what sets you apart.",
    },
    {
      icon: TrendingUp,
      title: "Struggling with Conversions",
      description: "Applications not turning into offers? We'll show you why.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-32 py-24">
      {/* Why This Matters - Bento Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight"
          >
            Why this Workshop matters now?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 font-medium"
          >
            The hiring landscape has fundamentally changed. Here is what you
            need to be prepared.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {/* Card 1: Tougher */}
          <BentoTile
            className="lg:col-span-3 max-lg:rounded-t-4xl lg:rounded-tl-4xl"
            eyebrow="Market Shift"
            title="Tougher, more selective"
            description="Interviews are more rigorous than ever. Companies are raising the bar, and 'average' doesn't cut it anymore."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/ghyfFEStl6BNusZl0ZQd5r7JpM.png)] object-fill" />
            }
          />

          {/* Card 2: AI */}
          <BentoTile
            className="lg:col-span-3 lg:rounded-tr-4xl"
            eyebrow="Evaluation"
            title="AI-Influenced evaluation"
            description="AI tools are changing how candidates are screened and assessed. Understanding this shift is critical."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/7CJtT0Pu3w1vNADktNltoMFC9J4.png)] object-fill" />
            }
          />

          {/* Card 3: Clarity */}
          <BentoTile
            className="lg:col-span-3 lg:rounded-bl-4xl"
            eyebrow="Soft Skills"
            title="Clarity & communication"
            description="Recruiters expect clear thinking, strong communication, and applied problem-solving skills."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/PTO3RQ3S65zfZRFEGZGpiOom6aQ.png)] object-contain" />
            }
          />

          {/* Card 4: Smart Prep */}
          <BentoTile
            className="lg:col-span-3 max-lg:rounded-b-4xl lg:rounded-br-4xl"
            eyebrow="Preparation"
            title="Smart preparation wins"
            description="Most candidates prepare too scattered, too late, or without feedback. This session shows you the right way."
            graphic={
              <div className="absolute inset-0 bg-[url(https://framerusercontent.com/images/h496iPSwtSnGZwpJyErl6cLWdtE.png)] object-contain" />
            }
          />
        </div>
      </section>

      {/* Who This Is For */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Core Personas</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 text-slate-950 tracking-tighter uppercase italic leading-none"
          >
            Who This Workshop <br className="hidden md:block" /> Is Actually For
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 font-medium max-w-2xl mx-auto"
          >
            A highly specialized session designed for ambitious engineers who prioritize real-world conversion over theoretical knowledge.
          </motion.p>
        </div>

        <div className="relative border border-slate-100 rounded-[2.5rem] bg-slate-50/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {whoIsFor.map((audience, i) => (
              <IdentityCard key={i} index={i} {...audience} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
