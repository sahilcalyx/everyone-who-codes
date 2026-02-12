import { Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-100 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src="https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp"
            alt="Everyone Who Codes Logo"
            className="h-8 w-auto object-contain brightness-0 opacity-70 hover:opacity-100 transition-opacity"
          />
          <p className="text-sm text-slate-500">
            &copy; 2026 Everyone Who Codes. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
