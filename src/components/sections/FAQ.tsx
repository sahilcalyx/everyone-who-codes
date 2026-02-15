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
      question: "Will there be a recording?",
      answer: "No, this is a LIVE-ONLY session. Since we dive into real tactics and interactive Q&A, you need to attend live to get the full value. No recordings will be shared later.",
    },
    {
      question: "What if I can't attend after registering?",
      answer: "We offer a 100% satisfaction guarantee. If you register but cannot attend for a valid reason, or if you attend and feel the session didn't add value, just let us know and we'll issue a full refund.",
    },
    {
      question: "Is this workshop suitable for beginners?",
      answer: "Yes! Whether you're a final-year student or a working professional, the core preparation strategies we share are applicable to anyone targeting tech roles.",
    },
    {
      question: "How does the Resume Review work?",
      answer: "After the workshop, the first 10 attendees will get a personalized resume review. This is a high-value service (usually $499) where we give you a 15-min video breakdown of how to improve your resume for ATS and recruiters.",
    },
    {
      question: "Where will the workshop happen?",
      answer: "The workshop will be held live on Zoom. You will receive the joining link via email once you complete your registration.",
    },
    {
      question: "How will I receive the bonuses?",
      answer: "All workshop bonuses, including the Interview Prep Guide and Mentorship discounts, will be shared with attendees at the end of the LIVE session.",
    },
    {
      question: "What should I do after the workshop?",
      answer: "You'll leave with a clear 90-day action plan. You can choose to implement it yourself or join our elite mentorship program for hands-on guidance.",
    },
    {
      question: "Is this and only for technical roles?",
      answer: "The workshop focuses on Software Engineering, Data, ML, and AI roles. However, the networking and resume strategies are valuable for anyone in the tech ecosystem.",
    },
    {
      question: "Who are the mentors?",
      answer: "The session is led by Lakshmi Marikumar (Founder, EWC) and Rajesh Pandey (Salesforce, ex-Microsoft), bringing over 14+ years of industry experience.",
    },
    {
      question: "Can I ask my specific career questions?",
      answer: "Absolutely! The final 15-20 minutes are dedicated entirely to a LIVE Q&A session where you can ask your specific questions.",
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
