"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, X, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="z-10 w-full mt-14 lg:mt-28 h-11/12">
      {/* Top callout band */}
      <section
        className={cn(
          "relative overflow-hidden",
          "rounded-[18px]",
          "bg-gradient-to-b from-[hsl(var(--primary)/0.55)] via-[hsl(var(--primary)/0.28)] to-black/70",
          "mx-auto w-full"
        )}
      >
        <div className="py-24 text-center px-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Your Identity, <br className="hidden sm:block" /> Empowered with Blockchain Technology.
          </h3>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
           Prove who you are once and reuse everywhere.</p>
          <div className="mt-6">
            <Button variant="glassLight" size="lg">Get Started</Button>
          </div>
        </div>
        <div className="h-px w-full bg-white/10" />

        {/* Link columns */}
        <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-[7px] border border-white/10 bg-gradient-to-b from-[hsl(var(--primary)/0.88)] to-[hsl(var(--primary)/0.76)]" />
               <span className="text-lg font-semibold">Keystone</span>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              Making identites global.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-sm text-white/60 uppercase tracking-wider">Explore</p>
             <ul className="mt-3 space-y-2 text-white/90">
               <li><a className="hover:text-white/60" href="#how-it-works">How it works</a></li>
               <li><a className="hover:text-white/60" href="#services">Services</a></li>
               <li><a className="hover:text-white/60" href="#contact">Contact</a></li>
               <li><a className="hover:text-white/60" href="#faq">FAQ</a></li>
             </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm text-white/60 uppercase tracking-wider">Legal</p>
            <ul className="mt-3 space-y-2 text-white/90">
              <li><a className="hover:text-white/60" href="#">Terms & Conditions</a></li>
              <li><a className="hover:text-white/60" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-white/60" href="#">404</a></li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
           <p>© {new Date().getFullYear()} Keystone. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/70">
            <a aria-label="GitHub" href="#" className="hover:text-white"><Github className="w-5 h-5" /></a>
            <a aria-label="LinkedIn" href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
            <a aria-label="X" href="#" className="hover:text-white"><X className="w-5 h-5" /></a>
          </div>
        </div>
      </section>
    </footer>
  );
}


