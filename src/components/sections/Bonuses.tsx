
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { BookOpen, Bot, DollarSign, FileText } from "lucide-react"

export function Bonuses() {
    const bonuses = [
        {
            icon: BookOpen,
            title: "Interview Prep Guide",
            description: "50 Most Common Behavioral Questions with STAR Framework answers + System Design cheat sheet",
        },
        {
            icon: Bot,
            title: "AI Tools for Job Search",
            description: "How to use ChatGPT for resume optimization, AI interview prep tools, and prompt templates library",
        },
        {
            icon: DollarSign,
            title: "$100 Off Mentorship",
            description: "First 50 registrants get $100 off their first 1:1 mentorship session (valid 30 days)",
        },
        {
            icon: FileText,
            title: "Free Resume Review worth $499",
            description: "Complimentary 15-min resume review for attendees who submit within 7 days",
        },
    ]

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50">
            {/* Background blobs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Exclusive Workshop Bonuses</h2>
                    <p className="text-xl text-slate-600">
                        Every attendee receives these valuable resources worth $1200+
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {bonuses.map((bonus, i) => (
                        <Card key={i} className="bg-white/60 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    <bonus.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-lg text-slate-900">{bonus.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-slate-600">{bonus.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-primary/10 to-emerald-500/10 text-primary-foreground px-6 py-3 rounded-full border border-primary/20 font-medium">
                        Register before March 10th to unlock all bonuses worth $2500
                    </div>
                </div>
            </div>
        </section>
    )
}
