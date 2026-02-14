"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { ReactNode } from "react";

interface RegistrationModalProps {
    children: ReactNode;
    triggerClassName?: string;
}

export function RegistrationModal({ children, triggerClassName }: RegistrationModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild className={triggerClassName}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 border-none bg-transparent shadow-none overflow-visible">
                <div className="relative max-h-[90vh] flex flex-col">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-emerald-400/30 rounded-[2.5rem] blur-2xl opacity-20 pointer-events-none" />
                    <div className="relative flex flex-col border-slate-100 shadow-2xl rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border">
                        <DialogHeader className="bg-slate-50/80 border-b border-slate-100 py-6 px-8 sticky top-0 z-10 backdrop-blur-md">
                            <DialogTitle className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
                                Reserve Your Spot
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                                Join 500+ engineers in this elite session.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-8 pb-10 overflow-y-auto custom-scrollbar">
                            <RegistrationForm />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
