"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { RegistrationModal } from "@/components/modals/RegistrationModal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: "Vishal Kumar",
      content: "I had a great conversation and got valuable insights from Lakshmi! She provided a thorough resume review, gave constructive feedback, and was very friendly throughout. She also helped me outline a solid 3-month plan to improve my skills and career prospects. Highly recommend for anyone looking for guidance!",
      rating: 5
    },
    {
      name: "Siddharth K",
      content: "I truly appreciate some of the suggestions shared by Lakshmi Marikumar during the application process. I have secured multiple offers. Thanks again for your support and guidance.",
      rating: 5
    },
    {
      name: "Siddhesh N",
      content: "Lakshmi, Thanks to your incredible help with my resume and job search advice, I just landed a role, and I am starting soon. I couldn’t have done it without you, and I really appreciate all the guidance you gave me.",
      rating: 5
    },
    {
      name: "Sai Keerthi",
      content: "Thanks to Lakshmi, her mentoring and resume review transformed my job search, leading to three interviews and multiple offers. Her expertise is truly invaluable. Grateful for her guidance!",
      rating: 5
    },
    {
      name: "Dwight Beadle",
      content: "Lakshmi, Thanks to your incredible help with my resume and job search advice, I just landed a role, and I am starting soon. I couldn’t have done it without you, and I really appreciate all the guidance you gave me.",
      rating: 5
    },
    {
      name: "Ryan Menghani",
      content: "I’d highly recommend Lakshmi Marikumar. Lakshmi helped me immensely to land my current position. She is extremely passionate and most importantly, genuine – she cares tremendously for each of her candidates. Seriously, Lakshmi’s the real deal!",
      rating: 5
    },
    {
      name: "Akanksha",
      content: "Lakshmi was very helpful. She listened to my problem, reviewed my LinkedIn, and immediately pointed out areas where my profile needed improvements. Also provided some great tips that I will be surely implement in my job search moving forward.",
      rating: 5
    },
    {
      name: "Vasudha Y",
      content: "Lakshmi had given me valuable inputs and shared me with useful information. Very helpful",
      rating: 5
    },
    {
      name: "Harshit Kant",
      content: "She is a strong force when it comes to resume and tech career suggestions",
      rating: 5
    }
  ];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]"
          >
            <Quote className="h-3 w-3" />
            Candidate Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight"
          >
            Real Stories, <span className="text-primary italic">Real Success.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Join hundreds of engineers who have transformed their careers with
            expert resume reviews, interview prep, and strategic guidance.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          {/* Main Carousel Card */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Card className="bg-white/80 backdrop-blur-xl border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden">
                  <CardContent className="p-8 md:p-16 text-center space-y-8">
                    <div className="flex justify-center gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <blockquote className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed italic">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    <div className="pt-8 border-t border-slate-100">
                      <p className="text-xl font-black text-slate-900 uppercase tracking-widest">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm font-bold text-primary italic uppercase tracking-widest mt-1">
                        Verified Success Candidate
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute -left-4 md:-20 top-1/2 -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 active:scale-95 transition-all z-10"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-4 md:-20 top-1/2 -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 rounded-full bg-slate-900 shadow-xl flex items-center justify-center text-white hover:bg-primary hover:scale-110 active:scale-95 transition-all z-10"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === currentIndex ? "w-12 bg-primary" : "w-2 bg-slate-200 hover:bg-slate-300"
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <RegistrationModal>
            <button
              className="inline-flex items-center gap-3 px-10 py-5 bg-slate-950 text-white font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-slate-950/20"
            >
              Start Your Success Story
              <ArrowRight className="h-5 w-5" />
            </button>
          </RegistrationModal>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
