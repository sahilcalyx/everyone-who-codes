"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Software Engineer at Google",
      content:
        "The system design module completely changed how I approach scalability questions. I landed my L4 offer two weeks later!",
    },
    {
      name: "Michael Chen",
      role: "Senior Frontend Dev",
      content:
        "I was struggling to get past the initial recruiter screen. The resume and LinkedIn strategies in Module 3 were a game changer.",
    },
    {
      name: "Priya R.",
      role: "Data Scientist",
      content:
        "Finally, someone explained how AI tools are actually being used in interviews. I felt so much more prepared and confident.",
    },
    {
      name: "David K.",
      role: "New Grad",
      content:
        "As a new grad, I was lost. This workshop gave me a clear roadmap. The mentorship discount was just the cherry on top.",
    },
    {
      name: "Elena M.",
      role: "Product Manager",
      content:
        "Even as a PM, the technical insights were invaluable. It helped me bridge the gap during my technical rounds.",
    },
    {
      name: "James W.",
      role: "Backend Engineer",
      content:
        "Worth every penny. The mock interview insights alone saved me from making critical mistakes I didn't even know I was making.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            Success Stories from Our Community
          </h2>
          <p className="text-xl text-slate-600">
            Real results from engineers who transformed their careers with
            expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            >
              <CardHeader className="pb-2">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-700 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
