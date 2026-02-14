"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BadgeCheck, CalendarIcon } from "lucide-react";
import { CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse, isSameDay } from "date-fns";

export function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        contactNumber: "",
        expert: "",
        slotId: "",
    });
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [experts, setExperts] = useState<any[]>([]);
    const [slots, setSlots] = useState<any[]>([]);
    const [fee, setFee] = useState(15);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const json = await res.json();
                if (json.success) {
                    setExperts(json.data.experts);
                    setFee(json.data.fee);
                    setSlots(json.data.slots || []);
                }
            } catch (err) {
                console.error("Failed to fetch settings:", err);
            }
        };
        fetchSettings();
    }, []);

    const validScheduledDates = (slots || [])
        .map((s) => {
            try {
                const p = parse(s.date, "MMMM d, yyyy", new Date());
                return isNaN(p.getTime()) ? null : p;
            } catch (e) {
                return null;
            }
        })
        .filter((d): d is Date => d !== null);

    const customDateStrings = Array.from(new Set(
        (slots || [])
            .map(s => s.date)
            .filter(dStr => {
                try {
                    const p = parse(dStr, "MMMM d, yyyy", new Date());
                    return isNaN(p.getTime());
                } catch (e) {
                    return true;
                }
            })
    ));

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const formattedDate = format(date, "MMMM d, yyyy");
            setSelectedDate(formattedDate);
            setFormData({ ...formData, slotId: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedSlot = slots.find((s) => s.id === formData.slotId);

        if (!selectedSlot) {
            alert("Please select an available workshop time slot.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    lastname: formData.lastname,
                    email: formData.email,
                    contactNumber: formData.contactNumber,
                    expert: formData.expert || "N/A",
                    date: selectedSlot.date,
                    time: selectedSlot.time,
                }),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({
                    name: "",
                    lastname: "",
                    email: "",
                    contactNumber: "",
                    expert: "",
                    slotId: "",
                });
                setSelectedDate("");

                setTimeout(() => {
                    window.location.href = "https://book.stripe.com/8x23cw5H8fnv56DdA2fMA0p";
                }, 1500);
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("An unexpected error occurred. Please try again.");
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
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BadgeCheck className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950">
                    Registration Complete!
                </h3>
                <p className="text-slate-600 font-medium">
                    We've sent the details to your email. See you there!
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Name
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
                        Lastname
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
            <div className="space-y-2">
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
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Contact Number
                </label>
                <Input
                    placeholder="+1 (555) 000-0000"
                    className="rounded-xl h-12 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary font-medium"
                    value={formData.contactNumber}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            contactNumber: e.target.value,
                        })
                    }
                    required
                />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Choose Workshop Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "h-12 w-full justify-start text-left font-bold rounded-xl border-slate-200 bg-slate-50/50",
                                    !selectedDate && "text-muted-foreground",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                {selectedDate ? (
                                    selectedDate
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto p-0 border-none shadow-2xl rounded-2xl overflow-hidden"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={
                                    selectedDate
                                        ? parse(
                                            selectedDate,
                                            "MMMM d, yyyy",
                                            new Date(),
                                        )
                                        : undefined
                                }
                                onSelect={handleDateSelect}
                                disabled={(date) =>
                                    date <
                                    new Date(new Date().setHours(0, 0, 0, 0)) ||
                                    !validScheduledDates.some((sd) =>
                                        isSameDay(sd, date),
                                    )
                                }
                                modifiers={{
                                    highlighted: validScheduledDates,
                                }}
                                modifiersClassNames={{
                                    highlighted:
                                        "bg-primary/10 text-primary font-black rounded-lg",
                                }}
                                initialFocus
                                className="bg-white"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {customDateStrings.length > 0 && (
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                            Or Select Special Schedule
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {customDateStrings.map((dStr) => (
                                <button
                                    key={dStr}
                                    type="button"
                                    onClick={() => {
                                        setSelectedDate(dStr);
                                        setFormData({ ...formData, slotId: "" });
                                    }}
                                    className={`px-4 py-2 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${selectedDate === dStr
                                        ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10"
                                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                                        }`}
                                >
                                    {dStr}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                            Select Available Time
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {slots
                                .filter((s) => s.date === selectedDate)
                                .map((slot) => (
                                    <button
                                        key={slot.id}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                slotId: slot.id,
                                            })
                                        }
                                        className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.slotId === slot.id
                                            ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10"
                                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                                            }`}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                        </div>
                        <input
                            type="hidden"
                            value={formData.slotId}
                            required
                        />
                    </motion.div>
                )}
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-black uppercase italic tracking-tighter rounded-2xl bg-primary text-white hover:brightness-105 shadow-xl shadow-primary/20 transition-all border-none"
                >
                    {loading
                        ? "Processing..."
                        : `Secure Your Spot — $${fee}`}
                </Button>
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                    🔒 Encrypted Secure Checkout
                </p>
            </div>
        </form>
    );
}
