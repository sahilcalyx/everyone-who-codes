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
      question: "Will this workshop be recorded?",
      answer: "No, this is a LIVE-ONLY session on Zoom. We don't record to encourage active participation and protect the privacy of attendees during Q&A. You must attend live to get the full value.",
    },

    {
      question: "What if I am a complete beginner?",
      answer: "Perfect! This workshop is designed for engineers at ALL levels, from students just starting out to mid-career professionals looking to level up. We cover fundamentals while providing advanced insights.",
    },
    {
      question: "How is this different from free YouTube content",
      answer: "This is a structured, comprehensive workshop by industry experts who've actually hired at top companies. You get live interaction, personalized Q&A, curated insights from multiple mentors, and $600+ in bonuses — all for $15. YouTube can't give you that.",
    },
    {
      question: "What platform will we use?",
      answer: "The workshop will be conducted live on Zoom. You'll receive the link via email after registration. Make sure to test your audio before the session.",
    },
    {
      question: "When will I receive the bonuses?",
      answer: "The $100 mentorship discount, free resume review along with the Interview Prep Guide are available to attendees immediately after the workshop ends.",
    },
    {
      question: "What happens after the workshop?",
      answer: "You'll walk away with clear action items and a roadmap for your interview prep. Many attendees choose to continue with our 1:1 mentorship, mock interviews, or structured career guidance programs — but that's completely optional.",
    },
    {
      question: "Is this workshop right for non-technical roles?",
      answer: "While the focus is on software engineering roles, the resume, LinkedIn, and job search strategies are valuable for anyone in tech. System design discussions are specific to technical roles.",
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer: "Due to the low price point ($15) and the exclusive bonuses provided, we don't offer refunds.  ",
    },
    {
      question: "How long will I have access to the bonuses?",
      answer: "Digital bonuses (templates, guides) are yours to keep forever. The $100 mentorship discount is valid for 30 days after the workshop. The Interview Prep Guide and free resume review call details will be shared within 7 days of the workshop.",
    },
    {
      question: "Who are the mentors?",
      answer: "The workshop is led by Lakshmi Marikumar (Founder of EWC, ex-Twitter/AWS recruiter), Special guest Rajesh Pandey ( Mentor, Salesforce, Ex- Microsoft)",
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
