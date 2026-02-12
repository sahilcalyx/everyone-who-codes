"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lock, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep(2);
        setMessage("OTP sent to your email (and logged in console).");
      }
    } catch (err) {
      setMessage("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });
      if (res.ok) {
        window.location.href = "/admin/dashboard";
      } else {
        setMessage("Invalid OTP.");
      }
    } catch (err) {
      setMessage("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;

    const digits = data.split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);

    // Focus last filled or next empty
    const nextIndex = digits.length < 6 ? digits.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 rounded-[2rem] bg-slate-950 text-white mb-6 shadow-2xl shadow-slate-200">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter leading-none mb-2">
            Admin Portal
          </h1>
          <p className="text-slate-500 font-medium">
            Identity verification required
          </p>
        </div>

        <Card className="border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardContent className="p-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOtp}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      Encrypted Gateway
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        placeholder="ADMIN_ID"
                        className="w-full h-16 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 font-bold transition-all outline-none text-slate-900 placeholder:text-slate-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 rounded-2xl bg-slate-950 text-white font-black uppercase tracking-widest italic flex items-center justify-center gap-3 hover:bg-slate-900 active:scale-[0.98] transition-all"
                  >
                    {loading ? (
                      "Initializing..."
                    ) : (
                      <>
                        Invoke OTP
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-8"
                >
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <ShieldCheck className="h-4 w-4 text-primary animate-pulse" />
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Security Checkpoint
                      </label>
                    </div>

                    <div
                      className="flex justify-between gap-2 md:gap-3"
                      onPaste={handlePaste}
                    >
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => { inputRefs.current[idx] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          onKeyDown={(e) => handleKeyDown(e, idx)}
                          className={cn(
                            "w-full h-14 md:h-16 rounded-xl md:rounded-2xl border-2 text-center text-xl md:text-2xl font-black transition-all outline-none",
                            digit
                              ? "bg-white border-primary text-slate-950 shadow-lg shadow-primary/5"
                              : "bg-slate-50 border-slate-100 text-slate-400 focus:border-primary/50",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-primary font-black uppercase tracking-widest mt-4 min-h-[1rem]">
                      {message}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      disabled={loading || otp.join("").length !== 6}
                      className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest italic shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      {loading ? "Decrypting..." : "Access System"}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors py-2"
                    >
                      Return to ID Authentication
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          System ID: KV_ADMIN_SECURE_GATEWAY // 2026
        </div>
      </motion.div>
    </div>
  );
}
