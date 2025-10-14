"use client";

import * as React from "react";
import { IconType } from "react-icons";
import { FaGithub, FaGitlab, FaNpm, FaDocker } from "react-icons/fa6";
import { BiLogoVisualStudio } from "react-icons/bi";
import { SiVercel, SiNextdotjs, SiPostman, SiJest, SiTypescript } from "react-icons/si";
import { IconBubble } from "@/components/process-parts";

const DEFAULT_ICONS: IconType[] = [
  FaGithub,
  FaGitlab,
  FaNpm,
  FaDocker,
  SiVercel,
  SiNextdotjs,
  BiLogoVisualStudio,
  SiPostman,
  SiJest,
  SiTypescript,
];

export default function DevMarquee({ icons = DEFAULT_ICONS }: { icons?: IconType[] }) {
  const doubled = [...icons, ...icons];
  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* mask edges
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent" /> */}

      <div className="flex flex-col gap-4">
      
        <div className="flex items-center whitespace-nowrap gap-4 marquee" style={{ animationDuration: "28s" }}>
          {doubled.map((Logo, i) => (
            <div key={`r1-${i}`} className="flex items-center justify-center relative" style={{ minWidth: 70, minHeight: 70, zIndex: 10 }}>
            <IconBubble key={`r1-${i}`} icon={Logo} size={70}/>
            </div>
          ))}
        </div>
       
        <div className="flex items-center whitespace-nowrap gap-4 marquee" style={{ animationDuration: "28s", animationDirection: "reverse" }}>
          {doubled.map((Logo, i) => (
            <div key={`r2-${i}`} className="flex items-center justify-center relative" style={{ minWidth: 70, minHeight: 70, zIndex: 10 }}>
            <IconBubble key={`r2-${i}`} icon={Logo} size={56} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


