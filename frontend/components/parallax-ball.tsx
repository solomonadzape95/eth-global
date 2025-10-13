"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import imgUrl from "@/assets/ball-webpage.png";

function ParallaxBall() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffset(window.scrollY * 0.2);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Image
      src={imgUrl}
      alt="ball-webpage"
      width={600}
      height={600}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
      className="absolute lg:-right-[130px] -right-[160px] lg:-top-[230px] -top-[150px] ball-bounce -z-10
        w-[300px] h-[300px] 
        sm:w-[400px] sm:h-[400px] 
        md:w-[500px] md:h-[500px] 
        lg:w-[600px] lg:h-[600px]"
      priority
    />
  );
}

export default ParallaxBall;