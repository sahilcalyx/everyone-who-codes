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
      name: "Siddhesh Nair",
      content: "I'm incredibly grateful for the guidance and support I received from Lakshmi. Right after graduating, I felt uncertain about how to best position myself in the job market. Lakshmi took the time to review my resume in detail, provide thoughtful feedback, and share actionable advice that made a real difference.",
      rating: 5
    },
    {
      name: "Shivani Rupnawar",
      content: "Great sessions. Appreciate how approachable and supportive Lakshmi was throughout the career guidance sessions. I will definitely recommend Lakshmi to anyone looking to get interview calls or refine their Resume/ LinkedIn.",
      rating: 5
    },
    {
      name: "Nishal Pattan",
      content: "I wanted to thank Lakshmi and the mentors in Everyone Who Codes. After being laid off from a big tech company, this step-by-step structured mentorship was perfect to land my next role in 90 days. I would highly recommend this program.",
      rating: 5
    },
    {
      name: "Bella Yu",
      content: "Lakshmi reviewed my resume and I ended up getting PM internship interviews at IBM, Google, Adobe, and Microsoft. I'm happy to say I accepted an offer at a great tech company. Highly recommend working with her!",
      rating: 5
    },
    {
      name: "Rajesh (SDE-2 Candidate)",
      content: "Rajesh helped me gain insights on the career path, resources and key skills. His ability to communicate things in a personalized and targeted manner is to be appreciated. His knowledge regarding designing systems is amazing and his guidance for SDE 2 interview preparation was simply valuable.",
      rating: 5
    },
    {
      name: "Shahraiz (Mock Attendee)",
      content: "Shahraiz is very straightforward person in my mock interviews with him and he gives constructive feedback which is great to go back and build my basics in DSA. He is very supportive of my roadmap and roots for me to achieve my goals.",
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
            Success Stories from <span className="text-primary italic">Our Community</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Real results from engineers who transformed their careers with expert guidance
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
