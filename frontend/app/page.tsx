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
import FAQ from "@/components/faq";
import Offer from "@/components/offer";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden relative">
      <div className=" p-4 lg:p-8 ">
      <Header/>
    {[...Array(3)].map((c,i) => <ParallaxBall ballNum={i+1 as 1 | 2| 3|4}/>)}
      <Hero/>
      <Offer/>
      <Process/>
      <FAQ/>
      <Contact/>
      </div>
      <Footer/>
    </div>
  );
}
