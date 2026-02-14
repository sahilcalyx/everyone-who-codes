"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { RegistrationModal } from "@/components/modals/RegistrationModal";

export function Modules() {
  const modules = [
    {
      id: "module-1",
      title: "MODULE 01: How Tech Interviews Work Today (AI-Aware View)",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>Led by experienced industry mentors</li>
          <li>How interviews are structured in 2026</li>
          <li>What interviewers evaluate beyond coding</li>
          <li>How AI tools influence hiring and preparation</li>
          <li>How to stand out without over-prepping</li>
        </ul>
      ),
    },
    {
      id: "module-2",
      title: "MODULE 02: System Design & Technical Preparation Essentials",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>Key system design patterns companies actually test</li>
          <li>How to think through scalability and trade-offs</li>
          <li>What to focus on first — and what to ignore</li>
          <li>How to structure your preparation timeline</li>
          <li>How strong candidates think during technical interviews</li>
        </ul>
      ),
    },
    {
      id: "module-3",
      title: "MODULE 03: Resume, LinkedIn & Job Search Strategy",
      content: (
        <div className="space-y-4">
          <p className="font-medium">
            Led by Lakshmi, Founder of Everyone Who Codes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>How to position your resume for recruiter screens</li>
            <li>How LinkedIn impacts interview calls</li>
            <li>Highlighting skills that align with AI-influenced roles</li>
            <li>How to network with purpose and use referrals effectively</li>
            <li>How to approach recruiters without sounding generic</li>
            <li>Common mistakes that block interviews</li>
          </ul>
        </div>
      ),
    },
    {
      id: "module-4",
      title: "MODULE 04: Live Q&A",
      content: (
        <p className="text-muted-foreground">
          Ask real questions. Get real answers from industry experts who've been
          in your shoes.
        </p>
      ),
    },
  ];

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            What You'll Learn
          </h2>
          <p className="text-xl text-slate-600">
            Four comprehensive modules packed into one transformative hour
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full bg-white rounded-2xl shadow-sm border border-border overflow-hidden px-4"
        >
          {modules.map((module) => (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="border-b-border last:border-0"
            >
              <AccordionTrigger className="text-lg md:text-xl font-medium py-6 hover:no-underline hover:text-primary transition-colors text-left text-slate-800">
                {module.title}
              </AccordionTrigger>
              <AccordionContent className="text-base pb-6 text-slate-600">
                {module.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <RegistrationModal>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black uppercase italic tracking-tighter rounded-2xl hover:brightness-105 transition-all shadow-xl shadow-primary/20"
            >
              Reserve Your Spot Now
            </button>
          </RegistrationModal>
        </div>
      </div>
    </section>
  );
}
