"use client";

import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { RegistrationModal } from "@/components/modals/RegistrationModal";

export function Investment() {
  const features = [
    "60-Min Intensive LIVE Workshop",
    "System Design & DSA Prep Strategy",
    "Resume & LinkedIn Optimization",
    "$1200+ in Exclusive Bonuses",
    "LIVE Q&A with Experts",
    "Professional Interview Prep Guide",
    "$100 Off Mentorship Discount",
    "100% Satisfaction Guarantee",
  ];

  return (
    <section
      id="investment"
      className="py-24 relative overflow-hidden bg-slate-50"
    >
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 px-6 py-2 rounded-bl-xl font-bold shadow-sm">
            Best Value
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
              Investment
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Less than the cost of a meal for career-changing clarity
            </p>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-6xl font-bold text-slate-900">$15</span>
              <span className="text-xl text-slate-500 self-end mb-2">
                / one-time
              </span>
            </div>
            <p className="text-sm text-green-600 font-medium">
              One-time investment + $1200+ in bonuses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              {features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {features.slice(4).map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <RegistrationModal>
              <button
                className="w-full md:w-auto h-14 px-8 text-lg font-bold bg-primary hover:brightness-105 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Reserve Your Spot Now
              </button>
            </RegistrationModal>
            <p className="mt-4 text-sm text-slate-400">
              Secure checkout • 100% Satisfaction Guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
