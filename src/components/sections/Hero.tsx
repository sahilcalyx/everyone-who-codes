import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock,
  DollarSign,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { TextRoll } from "@/components/ui/text-roll";
import {
  StatMiniCard,
  BackgroundElement,
} from "@/components/ui/visual-cores";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { RegistrationForm } from "@/components/forms/RegistrationForm";

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-white isolate">
      <BackgroundElement />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              LIVE TECH INTERVIEW WORKSHOP
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 flex flex-col leading-[1.1]"
            >
              <TextRoll duration={0.6} className="mb-2">
                From Resume to
              </TextRoll>
              <TextRoll className="text-primary bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
                Offer
              </TextRoll>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl md:text-3xl text-slate-800 font-semibold tracking-tight">
                Tech Interviews in the Age of AI
              </h3>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl font-medium leading-relaxed">
                Master the new rules of engagement. Elite preparation for the
                modern software engineer. Practical tactics, zero fluff.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-8 pt-4 border-t border-slate-100 w-full lg:w-auto overflow-x-auto no-scrollbar"
            >
              <StatMiniCard
                icon={Clock}
                label="Format"
                value="60min Session"
                colorClass="bg-blue-50 text-blue-600"
              />
              <StatMiniCard
                icon={DollarSign}
                label="Investment"
                value="One-Time $15"
                colorClass="bg-emerald-50 text-emerald-600"
              />
              <StatMiniCard
                icon={BadgeCheck}
                label="Access"
                value="Live Q&A"
                colorClass="bg-amber-50 text-amber-600"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full mt-8 overflow-hidden rounded-2xl border border-slate-100 shadow-lg bg-slate-50 relative aspect-video group"
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/yzkhhlx7yqE?si=kEpCuBSI_aGFZuCC"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0"
              ></iframe>
            </motion.div>
            <motion.a
              href="https://www.youtube.com/watch?v=yzkhhlx7yqE"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 mt-3 text-xs font-bold text-primary hover:underline uppercase tracking-widest"
            >
              <ArrowRight className="h-3 w-3" />
              Watch Full Video on YouTube
            </motion.a>
          </div>

          {/* Right Column - Registration Form */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-[500px] relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-emerald-400/50 rounded-3xl blur opacity-25" />
              <Card className="relative border-slate-100 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-6">
                  <CardTitle className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
                    Reserve Your Spot
                  </CardTitle>
                  <CardDescription className="text-slate-500 font-medium">
                    Join 500+ engineers in this elite session.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <RegistrationForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
