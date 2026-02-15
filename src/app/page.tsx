
"use client"

import * as React from "react"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { Modules } from "@/components/sections/Modules"
import { Bonuses } from "@/components/sections/Bonuses"
import { InterviewPrepGuide } from "@/components/sections/InterviewPrepGuide"
import { Testimonials } from "@/components/sections/Testimonials"
import { Mentors } from "@/components/sections/Mentors"
import { Investment } from "@/components/sections/Investment"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"
import { RegistrationModal } from "@/components/modals/RegistrationModal"

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans anti-aliased selection:bg-primary/20">
      <Header />
      <Hero />
      <Features />
      <Modules />
      <Bonuses />
      <InterviewPrepGuide />
      <Testimonials />
      <Mentors />
      <Investment />
      <FAQ />
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-12">
            What Happens After the Workshop
          </h2>
          <div className="space-y-8 text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            <p>
              You'll leave with a clear, personalized roadmap for your career.
              Whether you're targeting a job at a top tech firm or looking to
              advance in your current role, the strategies you learn will give
              you a significant edge.
            </p>
            <p>
              You'll also gain access to our community of like-minded engineers
              and mentors, where you can continue to learn, share, and grow.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto text-slate-900">Ready to Master Tech Interviews in the AI Era?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of engineers who have transformed their interview preparation and landed offers at top tech companies.
          </p>
          <RegistrationModal>
            <button className="h-14 px-8 text-lg font-bold bg-primary text-white rounded-xl hover:brightness-105 transition-all shadow-xl shadow-primary/20">
              Join the Workshop →
            </button>
          </RegistrationModal>
          <p className="mt-6 text-sm text-yellow-500 font-medium">
            Remember: This session will NOT be recorded — Register now to secure your spot
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
