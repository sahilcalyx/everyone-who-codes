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
      title: "MODULE 01: Tech Interviews in the AI Era — What's Really Changed?",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>The Preparation Shift: When Everyone Has AI</li>
          <li>What Interviewers Actually Evaluate in 2026</li>
          <li>The AI Trap: Surface-Level Confidence vs Real Understanding</li>
          <li>The New Differentiator: Signal Over Polish</li>
        </ul>
      ),
    },
    {
      id: "module-2",
      title: "MODULE 02: Mastering Technical Interviews — From DSA to System Design",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>DSA Mastery Beyond Patterns:</strong> How strong candidates think, adapt, and survive twists — not just memorize solutions</li>
            <li><strong>LLD That Feels Production-Ready:</strong> Designing clean APIs, extensible components, and writing code interviewers trust</li>
            <li><strong>HLD With Real Trade-Off Thinking:</strong> Scalability, bottlenecks, and why most "perfect" designs fail under probing</li>
            <li><strong>Preparation Timeline That Compounds:</strong> What to do first, what to delay, and how to structure prep for maximum ROI</li>
            <li><strong>Interview Intelligence:</strong> Communicating your thought process, handling pressure, and turning good answers into strong hires</li>
          </ul>
        </div>
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
            <li>How to position your resume for recruiter screens? ATS</li>
            <li>How LinkedIn impacts interview calls?</li>
            <li>Highlighting skills that align with tech roles</li>
            <li>How to network with purpose and use referrals effectively?</li>
            <li>How to approach recruiters without sounding generic?</li>
            <li>Common mistakes that block interviews?</li>
          </ul>
        </div>
      ),
    },
    {
      id: "module-4",
      title: "MODULE 04: Live Q&A",
      content: (
        <p className="text-muted-foreground">
          Ask questions & get real answers from industry experts.
        </p>
      ),
    },
  ];

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            What You Will Learn
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
