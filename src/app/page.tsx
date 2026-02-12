
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
import { RegistrationModal } from "@/components/RegistrationModal"
import { Button } from "@/components/ui/Button"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Override the default button behavior in components to open modal
  // This is a bit of a hack for the sake of this single-page demo
  // In a real app, we'd pass the openModal function down via props or context
  React.useEffect(() => {
    const handleRegisterClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.innerText.includes("Register") || target.innerText.includes("Reserve")) {
        // If it's a link to stripe (from Investment component), let it be handled there or intercept
        // For this demo, let's intercept all main CTAs if we want the modal first
        // But the requirements said "Button links to Stripe placeholder" for Investment section
        // And "Modal popup when clicking Register" in Functional Requirements
        // Let's assume the "Reserve Your Spot" in header and "Register Now" in hero open the modal
        // And the Investment section button links directly to Stripe as per specific requirement

        // Actually functional requirements say: "Modal popup when clicking Register", "Stripe redirect after submit"
        // So I should intercept ALL registration attempts to show the modal first.

        e.preventDefault()
        e.stopPropagation()
        openModal()
      }
    }

    // Attaching listeners to buttons is tricky with hydration. 
    // Instead, I'll wrap the page content and pass the handler if components supported it, 
    // or just rely on the specific components using a shared context or prop.
    // For simplicity in this "assemble" step, I will modify the relevant components to accept an `onRegister` prop
    // OR just use a global event listener for demonstration which is messy.

    // Better approach: I'll manually wire up the `Hero` and `Header` to open modal?
    // The previous components strictly had internal logic or no logic.
    // I should have injected the handler.
    // Let's update the components to accept an onClick or similar, OR just clone them with new props if possible (not easy with server/client split).

    // DECISION: I will update the Header and Hero components to accept an `onRegister` prop in a subsequent step if needed, 
    // but since I already wrote them to standard buttons, I might need to edit them.
    // Wait, the requirements said "CTA Buttons with hover animations".
    // I'll stick to editing the components to trigger the modal, OR
    // I'll just use the `openModal` in the `Investment` button if I can pass it.

    // Actually, I can just rewrite the `Hero` and `Header` imports to be wrappers that inject the handler? No.
    // I will edit `Header` and `Hero` to use a global context or just simple prop passing if I can edit them.
    // Since I can't easily edit them all at once without multiple tool calls, 
    // I'll add a simple client-side event bus or just straightforward prop drilling if I update the files.

    // Let's TRY to use a Context Provider to expose `openModal` to all components without prop drilling every single one.
    // But creation of context requires a new file.

    // Simpler: I'll just re-write the Header/Hero calls here to include the prop IF I had defined them. I didn't.
    // I'll just rely on the "Investment" section linking to Stripe directly as per text "Button links to Stripe placeholder".
    // AND "Modal popup when clicking Register" -> This might refer to the "Register Now" buttons in Hero/Header.

    // Let's update Header and Hero to take `onRegister` prop.

  }, [])

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
          <Button size="lg" className="h-14 px-8 text-lg font-bold">
            Join the Workshop →
          </Button>
          <p className="mt-6 text-sm text-yellow-500 font-medium">
            Remember: This session will NOT be recorded — Register now to secure your spot
          </p>
        </div>
      </section>

      <Footer />

      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />

      {/* 
        Temporary overlay to capture clicks for demonstration purposes since props weren't wired up.
        In a real app, I'd pass `onRegister={openModal}` to Header, Hero, etc.
        For this quick turnaround, I'll using a Global Click Listener approach in a separate component or just update the files.
        
        I will UPDATE Header.tsx and Hero.tsx to accept an onRegister prop in the next step to make this functional.
      */}
      <ClickHandler openModal={openModal} />
    </main>
  )
}

function ClickHandler({ openModal }: { openModal: () => void }) {
  React.useEffect(() => {
    const handleRegister = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if clicked element is a button and has specific text
      if (target.tagName === 'BUTTON' && (
        target.innerText.includes("Register") ||
        target.innerText.includes("Reserve") ||
        target.innerText.includes("Join")
      )) {
        // If it's the investment button (which links to stripe directly usually), we override it to show modal first
        // as per "Modal popup when clicking Register" requirement + "Stripe redirect after submit".
        e.preventDefault()
        e.stopPropagation()
        openModal()
      }
    }

    document.addEventListener('click', handleRegister, true)
    return () => document.removeEventListener('click', handleRegister, true)
  }, [openModal])

  return null
}
