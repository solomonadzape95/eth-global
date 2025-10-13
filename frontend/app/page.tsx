import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Header/>
      <Hero/>
    </div>
  );
}
