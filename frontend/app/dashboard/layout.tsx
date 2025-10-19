"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/keystone-logo.svg";
import Image from "next/image";
import ConnectButton from "@/components/connect-button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useNavbarHide } from "@/hooks/use-navbar-hiding";
import { useAccount } from "wagmi";

const DASHBOARD_NAV_ITEMS = [
  { label: "Verifications", href: "/dashboard/verifications" },
  { label: "Activity", href: "/dashboard/activity" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const scrollDirection = useNavbarHide()
  const router = useRouter()
  const {isConnected} = useAccount()

  React.useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function Hamburger({ open }: { open: boolean }) {
    return (
      <div className="relative w-7 h-7 flex flex-col items-center justify-center">
        <span
          className={cn(
            "block absolute left-1/2 top-1/2 h-[3px] w-7 bg-white rounded transition-all duration-400 ease-in-out",
            open
              ? "rotate-45 -translate-x-1/2 -translate-y-1/2 scale-x-110"
              : "-translate-x-1/2 -translate-y-2"
          )}
        />
        <span
          className={cn(
            "block absolute left-1/2 top-1/2 h-[3px] w-7 bg-white rounded transition-all duration-400 ease-in-out",
            open
              ? "-rotate-45 -translate-x-1/2 -translate-y-1/2 scale-x-110"
              : "-translate-x-1/2 translate-y-2"
          )}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className={cn("fixed top-0 inset-x-0 z-40 bg-black/40 md:bg-transparent backdrop-blur-lg", scrollDirection === "down" ? "-translate-y-full" : "translate-y-0")}>
        <div className="mx-auto max-w-6xl px-6 lg:px-0 py-2 lg:py-8">
          <div className="h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <span
                className={cn(
                  "w-9 h-9 rounded-[7px] border border-white/10 p-1",
                  "bg-gradient-to-b from-[hsl(var(--primary)/0.88)] to-[hsl(var(--primary)/0.76)]",
                  "backdrop-blur-md shadow-[0_10px_30px_rgba(16,185,129,0.25)]",
                  "grid place-items-center text-sm font-semibold text-white"
                )}
              >
                <Image src={logo} width={100} height={100} alt="logo" />
              </span>
            </a>

            <nav className="hidden md:flex">
              <div
                className={cn(
                  "rounded-2xl px-5 py-2",
                  "border border-white/5 backdrop-blur-md",
                  "bg-gradient-to-b from-white/10 to-white/5",
                  "shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
                )}
              >
                <ul className="flex items-center gap-8 text-lg text-white/90">
                  {DASHBOARD_NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center py-2 px-4 rounded-lg transition-all duration-200",
                          pathname === item.href
                            ? "text-white font-semibold"
                            : "hover:text-white/60 "
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:inline-flex"><ConnectButton onClick={() => {}} /></div>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                className={cn(
                  "md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-transparent text-white/80 transition-colors duration-300 focus:outline-none z-50"
                )}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <Hamburger open={open} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none fixed top-16 left-0 right-0 bottom-0 z-40 md:hidden",
            open && "pointer-events-auto"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300",
              open ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setOpen(false)}
          />
          <aside
            className={cn(
              "absolute left-0 top-0 w-full px-6 py-4 border-r border-white/10 bg-black/70 backdrop-blur-xl z-40 flex flex-col gap-8 transition-transform duration-300",
              "rounded-b-2xl shadow-[0_8px_28px_rgba(0,0,0,0.35)]",
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            style={{
              minHeight: "calc(100vh - 64px)",
              willChange: "transform, opacity",
            }}
          >
            <nav>
              <ul className="flex flex-col gap-5">
                {DASHBOARD_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-3xl font-semibold text-white font-thin hover:text-white/70 transition-colors",
                        pathname === item.href ? "text-white" : "text-white/80"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto">
              <ConnectButton onClick={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      </header>

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
