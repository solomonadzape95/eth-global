"use client"
import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ParallaxBall from "@/components/parallax-ball";
import Process from "@/components/process";
import Contact from "@/components/contact";
import FAQ from "@/components/faq";
import Offer from "@/components/offer";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function Home() {
  const {isConnected, isConnecting} = useAccount()
  const router = useRouter()

  return (
  <div className="p-0 overflow-hidden">
    <div className="min-h-screen flex flex-col p-4 lg:p-8 items-center  relative">
      <Header/>
    {[...Array(3)].map((c,i) => <ParallaxBall key={i} ballNum={i+1 as 1 | 2| 3|4}/>)}
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
