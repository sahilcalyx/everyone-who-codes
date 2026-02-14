"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/Dialog";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                {children}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-[2.5rem] bg-white p-0 overflow-hidden font-sans">
                    <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100 flex flex-col items-center text-center">
                        <DialogTitle className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                            Contact Us
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium">
                            Have questions? We're here to help you.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <ContactForm />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
