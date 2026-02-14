"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BadgeCheck } from "lucide-react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({
                    name: "",
                    lastname: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center space-y-4"
            >
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <BadgeCheck className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950">
                    Message Sent!
                </h3>
                <p className="text-slate-600 font-medium font-sans">
                    Thank you for reaching out. We'll get back to you shortly.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div className="grid grid-cols-2 gap-4 text-slate-900">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        First Name
                    </label>
                    <Input
                        placeholder="John"
                        className="rounded-xl h-12 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary font-medium"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Last Name
                    </label>
                    <Input
                        placeholder="Doe"
                        className="rounded-xl h-12 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary font-medium"
                        value={formData.lastname}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                lastname: e.target.value,
                            })
                        }
                        required
                    />
                </div>
            </div>
            <div className="space-y-2 text-slate-900">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Email Address
                </label>
                <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-xl h-12 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary font-medium"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                />
            </div>
            <div className="space-y-2 text-slate-900">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Subject
                </label>
                <Input
                    placeholder="General Inquiry"
                    className="rounded-xl h-12 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary font-medium"
                    value={formData.subject}
                    onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                />
            </div>
            <div className="space-y-2 text-slate-900">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Message
                </label>
                <textarea
                    placeholder="How can we help you?"
                    className="w-full min-h-[120px] rounded-xl bg-slate-50/50 border-slate-200 p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none border transition-all text-sm font-medium resize-none shadow-sm"
                    value={formData.message}
                    onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                    }
                    required
                />
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-black uppercase italic tracking-tighter rounded-2xl bg-slate-950 text-white hover:bg-black shadow-xl shadow-slate-900/10 transition-all border-none"
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </div>
        </form>
    );
}
