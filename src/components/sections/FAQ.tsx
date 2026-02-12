"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Will the session be recorded?",
      answer:
        "No. This is a live-only workshop designed for interactive learning and real-time Q&A. We want you to be fully present to get the most value.",
    },
    {
      question: "What if I can't attend live?",
      answer:
        "Since there is no recording, we highly recommend prioritizing this hour. If you absolutely cannot make it, please wait for the next cohort announcement.",
    },
    {
      question: "Is this suitable for beginners?",
      answer:
        "Yes! Whether you're a student, new grad, or early-career engineer, the principles we cover apply to all levels of technical interviewing.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 100% satisfaction guarantee. if you attend the workshop and feel you didn't get 10x the value, simply email us for a full refund.",
    },
    {
      question: "Will you review my resume personally?",
      answer:
        "Yes! All attendees who submit their resume within 7 days of the workshop receive a complimentary 15-minute video review worth $499.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-xl px-4 shadow-sm bg-white last:border-b"
            >
              <AccordionTrigger className="text-lg font-medium text-slate-900 hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
