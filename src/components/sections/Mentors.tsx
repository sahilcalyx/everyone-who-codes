
"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Badge } from "lucide-react"
import { RegistrationModal } from "@/components/modals/RegistrationModal"

export function Mentors() {
    const mentors = [
        {
            name: "Lakshmi Marikumar",
            role: "Founder, Everyone Who Codes",
            description: "Seasoned technical recruiter with experience hiring for top companies like Twitter, AWS, and leading startups in the US. Launched EWC in 2024 to support engineers with real job opportunities, industry insights, and expert mentorship.",
        },
        {
            name: "Sandeep Das",
            role: "Special Guest Expert",
            description: "Business Storytelling & Negotiation Leadership Coach, Best-Selling Author, and Visiting Faculty at IIM Bangalore and IIM Lucknow. Expert in the skills AI cannot replace: communication, clarity, and influence.",
        },
    ]

    return (
        <section className="py-24 bg-secondary/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet Your Mentors</h2>
                    <p className="text-xl text-muted-foreground">
                        Industry Engineers. Real Interview Experience. Proven Results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mentors.map((mentor, i) => (
                        <Card key={i} className="border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="h-2 bg-gradient-to-r from-primary to-emerald-500" />
                            <CardHeader>
                                <h3 className="text-xl font-bold">{mentor.name}</h3>
                                <p className="text-primary font-medium">{mentor.role}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{mentor.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

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
    )
}
