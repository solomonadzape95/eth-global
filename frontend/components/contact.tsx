"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="w-full max-w-6xl mx-auto mt-28 lg:mt-40">
      <div className="flex flex-col gap-4 lg:gap-6">
        <p className="text-sm text-primary">GET IN TOUCH</p>
        <h2 className="text-4xl lg:text-7xl">Contact</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 mt-8">
        {/* Left: Info cards */}
        <div className="flex flex-col gap-5">
          <InfoCard
            icon={<Mail className="w-6 h-6" />}
            title="Mail"
            lines={["hello@heliumtemplate.com"]}
          />
          <InfoCard
            icon={<Phone className="w-6 h-6" />}
            title="Phone"
            lines={["+1 (800) 123-4567"]}
          />
          <InfoCard
            icon={<MapPin className="w-6 h-6" />}
            title="Office"
            lines={["123 Innovation Drive, Suite 400 San Francisco, CA 94107 United States"]}
          />
        </div>

        {/* Right: Form */}
        <Card className="p-5 lg:p-6 border-white/10 backdrop-blur-md">
          <form className="grid grid-cols-1 gap-5">
            <FormField label="Full Name">
              <input className={inputClass} placeholder="John Doe" />
            </FormField>
            <FormField label="Company Name">
              <input className={inputClass} placeholder="AI Innovations Inc." />
            </FormField>
            <FormField label="Email">
              <input className={inputClass} type="email" placeholder="john.doe@aiagency.com" />
            </FormField>
            <FormField label="Message">
              <textarea className={inputClass + " min-h-[180px] resize-none"} placeholder="Hello! I'd like to learn more about your AI automation services." />
            </FormField>
            <div className="pt-2">
              <Button type="submit" variant="glassPrimary" size="lg" className="w-full">Submit</Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <Card className="p-5 lg:p-6 flex items-start gap-4 border-white/10 backdrop-blur-md">
      <span className="w-12 h-12 rounded-xl grid place-items-center bg-white/8 border border-white/10 text-white/90">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-sm text-white/70">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className="text-white/90">{l}</p>
        ))}
      </div>
    </Card>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-white/70">{label}</span>
      {children}
    </label>
  );
}

const inputClass = [
  "w-full",
  "rounded-xl",
  "px-4 py-3",
  "bg-white/5",
  "border border-white/10",
  "text-white/90 placeholder:text-white/40",
  "outline-none",
  "focus:ring-2 focus:ring-[hsl(var(--primary))]/50 focus:border-white/20",
  "backdrop-blur-md",
  "transition-colors",
].join(" ");


