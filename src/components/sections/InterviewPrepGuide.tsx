"use client"

import * as React from "react"
import { RegistrationModal } from "@/components/modals/RegistrationModal"
import { Sparkles, Trophy, Video, ArrowRight, Gift } from "lucide-react"

export function InterviewPrepGuide() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background with premium gradient/mesh effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 transition-all duration-1000" />

            <div className="container mx-auto px-4 relative">
                <div className="max-w-5xl mx-auto rounded-[2.5rem] p-1 md:p-1.5 bg-gradient-to-br from-primary/20 via-slate-200/50 to-emerald-500/20 shadow-2xl shadow-primary/10">
                    <div className="bg-white/80 backdrop-blur-3xl rounded-[2.4rem] px-8 py-16 md:px-16 overflow-hidden relative border border-white/50">

                        {/* Glossy overlay effect - subtle for light mode */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

                        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-sm tracking-wide uppercase">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    Limited Time Opportunity
                                </div>

                                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1]">
                                    Interview Prep Guide <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-600 to-primary/80">
                                        worth $250
                                    </span>
                                </h2>

                                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                    Crack Any Tech Interview — Free 45-Min Deep Dive on the Right Preparation Strategy
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                    {[
                                        { icon: Trophy, text: "FAANG Level Tactics" },
                                        { icon: Video, text: "45-Min Video Insight" },
                                        { icon: Gift, text: "Bonus Cheat Sheets" },
                                        { icon: Sparkles, text: "AI-Ready Strategies" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-600">
                                            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 group-hover:bg-primary/10 transition-colors">
                                                <item.icon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <span className="font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6">
                                    <RegistrationModal>
                                        <button className="group relative h-16 inline-flex items-center gap-4 px-10 text-xl font-bold bg-primary text-white rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-primary/25 overflow-hidden">
                                            <span className="relative z-10">Get Instant Access</span>
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                                        </button>
                                    </RegistrationModal>
                                    <p className="mt-4 text-sm text-slate-500 font-medium flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Available for FREE after this LIVE workshop
                                    </p>
                                </div>
                            </div>

                            <div className="relative hidden lg:block">
                                {/* Visual representation of the guide - Light version */}
                                <div className="relative z-10 transform scale-110 -rotate-2">
                                    <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50" />

                                        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-8 relative">
                                            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                                            <Gift className="w-16 h-16 text-primary" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">The Ultimate Tech Interview Handbook</h3>
                                        <p className="text-slate-600 text-sm">A comprehensive guide to systemic preparation that helped 500+ engineers land their dream roles.</p>

                                        <div className="mt-8 flex gap-2">
                                            <div className="h-2 w-16 bg-primary/20 rounded-full" />
                                            <div className="h-2 w-16 bg-slate-200 rounded-full" />
                                            <div className="h-2 w-16 bg-slate-200 rounded-full" />
                                        </div>

                                        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Floating elements for extra flair */}
                                <div className="absolute -top-10 -right-10 p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl animate-float">
                                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Value</div>
                                    <div className="text-3xl font-black text-slate-900">$249.00</div>
                                </div>

                                <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-white border border-slate-200 shadow-2xl animate-float-delayed">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 15}`} alt="User" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-slate-500">500+ accessing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
