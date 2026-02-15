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
            href="https://www.instagram.com/everyonewhocodes?igsh=YnJmMWdpMWR1NnB2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>

          <a
            href="https://www.youtube.com/@growwlaks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="https://www.instagram.com/everyonewhocodes?igsh=YnJmMWdpMWR1NnB2"
            target="_blank"
            rel="noopener noreferrer"
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
