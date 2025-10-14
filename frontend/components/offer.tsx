"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, ShieldCheck, Users } from "lucide-react";
import StackedNotification from "@/components/stacked-notification";
import DevMarquee from "@/components/dev-marquee";
import { ReactNode } from "react";
import QuadSecurity from "./quad-security";

type OfferItem = {
  key: string;
  title: string;
  blurb: string;
  badge: string;
  display: ReactNode;
  icon: React.ReactNode;
  classname: string;
};

const ITEMS: OfferItem[] = [
    {
        key: "business-main",
        badge: "For Businesses",
        display: <QuadSecurity className="w-full h-full" />,
        title: "Reduce Fraud & Build Trust",
        blurb:
          "Lower your risk by accepting users who have already been verified by a licensed provider. Save time and operational costs on KYC and compliance.",
        icon: <ShieldCheck className="w-5 h-5" />,
        classname: "col-span-3 md:col-span-2 row-span-2",
      },
  {
    key: "individuals-main",
    badge: "For Individuals",
        title: "Take Control of Your Identity",
        display: <StackedNotification app="GitHub" message="Verified with Keystone" subtext="You're good to go. Access granted to private repos." />, 
    blurb:
      "Stop uploading your sensitive documents to dozens of sites. Our privacy-first platform ensures you share a proof, not your personal data.",
    icon: <Users className="w-5 h-5" />,classname: "col-span-3 row-span-1",
     
  },
  {
    key: "developers-main",
    badge: "For Developers",    
    title: "Simple, Secure Integration",
    display: <DevMarquee />,
    blurb:
      "Onboard users faster with our easy-to-integrate API and widget. Focus on building your product, not on complex identity verification pipelines.",
    icon: <Code2 className="w-5 h-5" />,
    classname: "col-span-3 row-span-1",
  },
  
];

export default function Offer() {
  return (
    <section id="services" className="w-full max-w-6xl mx-auto mt-24 lg:mt-36">
      <div className="flex flex-col gap-3 lg:gap-4">
        <p className="text-sm text-primary">WHAT WE OFFER</p>
        <h2 className="text-4xl lg:text-7xl">Our Services</h2>
      </div>

      
      <div
        className="mt-8 grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 gap-4 min-h-[50vh]"
      >
        {ITEMS.map((item) => (
          <div
            key={item.key}
            className={item.classname + " h-full"} 
            style={{ height: "100%" }}
          >
            <OfferCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function OfferCard({ item }: { item: OfferItem }) {
  return (
    <Card
      className={[
        "p-5 lg:p-6 border-white/10 backdrop-blur-md",
        "rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.35)]",
        "h-full", 
        "flex flex-col", 
      ].join(" ")}
    >
      <div className="flex items-center gap-2 text-white/70">
        <span className="inline-flex items-center gap-2 text-xs text-primary tracking-wide uppercase">
          {item.icon}
          {item.badge}
        </span>
      </div>
      <div className="mt-4 flex-1">
         {item.display}
        </div>
     <div className="mt-auto space-y-4">
         <h3 className="mt-3 text-2xl lg:text-3xl">{item.title}</h3>
      <p className="mt-2 text-white/70 flex-1">{item.blurb}</p>
        
      
        <Button size="lg" variant="glassNeutral">
          Try it out
        </Button>
      </div>
    </Card>
  );
}

function VisualTile() {
  return (
    <Card className="relative overflow-hidden border-white/10 rounded-2xl min-h-[200px]">
      <span></span>
    </Card>
  );
}

