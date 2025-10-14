"use client";

import { Card } from "@/components/ui/card";
import { FaKey, FaCog, FaLock, FaShieldAlt } from "react-icons/fa";
import * as React from "react";

type QuadSecurityProps = {
  className?: string;
  rounded?: string; // tailwind radius, default rounded-2xl
  intervalMs?: number; // default 3000ms
};

export default function QuadSecurity({ className = "", rounded = "rounded-2xl", intervalMs = 3000 }: QuadSecurityProps) {
  const icons = [FaKey, FaLock, FaShieldAlt, FaCog];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % icons.length), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs,icons.length]);

  return (
    <Card
      className={[
        "relative overflow-hidden border-white/10 bg-white/8 backdrop-blur-md",
        "shadow-[0_8px_28px_rgba(0,0,0,0.35)] flex items-center justify-center",
        rounded,
        className,
      ].join(" ")}
    >
      {/* soft vignettes */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[hsl(var(--primary)/0.25)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-10 w-44 h-44 rounded-full bg-[hsl(var(--primary)/0.18)] blur-2xl" />

      {/* Single-icon carousel */}
      <div className="relative aspect-[4/3] w-full grid place-items-center">
        {icons.map((Icon, i) => (
          <Icon
            key={i}
            className={[
              "absolute text-white/90 transition-opacity duration-500 ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ width: "60%", height: "60%" }}
          />
        ))}
      </div>
    </Card>
  );
}
