
"use client"

import * as React from "react"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { Modules } from "@/components/sections/Modules"
import { Bonuses } from "@/components/sections/Bonuses"
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
      <Testimonials />
      <Mentors />
      <Investment />
      <FAQ />
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What Happens After the Workshop</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-left">
            {[
              { title: "Know What to Fix", desc: "Walk away with clarity on exactly what you need to work on to land interviews and offers." },
              { title: "Clear Focus Areas", desc: "Understand what to prioritize in your preparation and job search strategy." },
              { title: "Optional Deep Dive", desc: "Many choose to continue with 1:1 mock interviews, AI-aware mentorship, and structured career guidance." },
              { title: "Decision Ready", desc: "You'll know whether deeper mentorship makes sense for your specific career goals." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-secondary/20">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto text-slate-900">Ready to Master Tech Interviews in the AI Era?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of engineers who've transformed their interview preparation and landed offers at top tech companies.
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
