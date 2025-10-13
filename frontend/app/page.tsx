import Header from "@/components/header";
import Hero from "@/components/hero";
import imgUrl from "@/assets/ball-webpage.png"
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 lg:p-8 overflow-hidden relative">
      <Header/>
      <Image
        src={imgUrl}
        alt="ball-webpage"
        width={600}
        height={600}
        className="absolute lg:-right-[130px] -right-[160px] lg:-top-[230px] -top-[150px] ball-bounce -z-10
          w-[300px] h-[300px] 
          sm:w-[400px] sm:h-[400px] 
          md:w-[500px] md:h-[500px] 
          lg:w-[600px] lg:h-[600px]"
        priority
      />
      <Hero/>
    </div>
  );
}
