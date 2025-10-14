"use client";

import { FaGoogle, FaMicrosoft, FaSlack, FaGithub } from "react-icons/fa6";
import { Card } from "./ui/card";

export default function StackedNotification({
  app = "GitHub",
  message = "Your identity was verified successfully.",
  subtext = "You can now sign in without re-uploading documents.",
}: {
  app?: string;
  message?: string;
  subtext?: string;
}) {
  return (
    <div className="relative w-full mx-auto mt-4 py-4 lg:py-0 lg:mt-8">
      <div className="absolute -bottom-[1px] lg:-bottom-3 w-11/12 left-1/2 -translate-x-1/2 h-10 lg:h-20 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-md px-4 py-3 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)]" />

      {/* main notification */}
      <Card className="relative rounded-2xl border border-white/10 backdrop-blur-md px-4 py-3 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center border border-white/10">
            <FaGithub className="w-5 h-5 text-white/80" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/70">{app}</p>
            <p className="truncate font-medium">{message}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-white/60">{subtext}</p>
      </Card>
    </div>
  );
}


