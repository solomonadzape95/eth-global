import Header from "@/components/header";
import Hero from "@/components/hero";
import imgUrl from "@/assets/ball-webpage.png"
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ParallaxBall from "@/components/parallax-ball";
import Process from "@/components/process";
import Contact from "@/components/contact";
import Offer from "@/components/offer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 lg:p-8 overflow-hidden relative">
      <Header/>
    {[...Array(4)].map((c,i) => <ParallaxBall ballNum={i+1 as 1 | 2| 3|4}/>)}
      <Hero/>
      <Offer/>
      <Process/>
      <Contact/>
    </div>
  );
}
