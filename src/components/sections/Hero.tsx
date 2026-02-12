"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  BadgeCheck,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import { TextRoll } from "@/components/ui/text-roll";
import {
  FloatingCard,
  StatMiniCard,
  BackgroundElement,
} from "@/components/ui/visual-cores";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    contactNumber: "",
    expert: "",
    slotId: "", // Track selected slot ID
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

  // Helper to get Date objects for scheduled sessions
  const scheduledDates = Array.from(new Set(slots.map((s) => s.date))).map(
    (dateStr) => parse(dateStr, "MMMM d, yyyy", new Date())
  );

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
          surname: formData.surname,
          email: formData.email,
          contactNumber: formData.contactNumber,
          expert: formData.expert,
          date: selectedSlot.date,
          time: selectedSlot.time,
        }),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          surname: "",
          email: "",
          contactNumber: "",
          expert: "",
          slotId: "",
        });
        setSelectedDate("");
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

  const scrollToInvestment = () => {
    const section = document.getElementById("investment");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-white isolate">
      <BackgroundElement />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              LIVE TECH INTERVIEW WORKSHOP
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 flex flex-col leading-[1.1]"
            >
              <TextRoll duration={0.6} className="mb-2">
                From Resume to
              </TextRoll>
              <TextRoll className="text-primary bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
                Offer
              </TextRoll>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl md:text-3xl text-slate-800 font-semibold tracking-tight">
                Tech Interviews in the Age of AI
              </h3>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl font-medium leading-relaxed">
                Master the new rules of engagement. Elite preparation for the
                modern software engineer. Practical tactics, zero fluff.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-8 pt-4 border-t border-slate-100 w-full lg:w-auto overflow-x-auto no-scrollbar"
            >
              <StatMiniCard
                icon={Clock}
                label="Format"
                value="60min Session"
                colorClass="bg-blue-50 text-blue-600"
              />
              <StatMiniCard
                icon={DollarSign}
                label="Investment"
                value="One-Time $15"
                colorClass="bg-emerald-50 text-emerald-600"
              />
              <StatMiniCard
                icon={BadgeCheck}
                label="Access"
                value="Live Q&A"
                colorClass="bg-amber-50 text-amber-600"
              />
            </motion.div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-[500px] relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-emerald-400/50 rounded-3xl blur opacity-25" />
              <Card className="relative border-slate-100 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-6">
                  <CardTitle className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
                    Reserve Your Spot
                  </CardTitle>
                  <CardDescription className="text-slate-500 font-medium">
                    Join 500+ engineers in this elite session.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {submitted ? (
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
                  ) : (
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
                            Surname
                          </label>
                          <Input
                            placeholder="Doe"
                            className="rounded-xl h-12 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary font-medium"
                            value={formData.surname}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                surname: e.target.value,
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
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                          Choose Our Expert
                        </label>
                        <select
                          className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-medium"
                          value={formData.expert}
                          onChange={(e) =>
                            setFormData({ ...formData, expert: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled>
                            Select an expert
                          </option>
                          {experts.map((expert) => (
                            <option key={expert.id} value={expert.name}>
                              {expert.name} — {expert.role}
                            </option>
                          ))}
                        </select>
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
                                  !scheduledDates.some((sd) =>
                                    isSameDay(sd, date),
                                  )
                                }
                                modifiers={{
                                  highlighted: scheduledDates,
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
                                    className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${
                                      formData.slotId === slot.id
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
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
