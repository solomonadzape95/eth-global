import Image from "next/image";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
const process = [
  { step: 1,
    title: "Scan & Verify",
    description:
      "Securely scan your government ID and complete a quick selfie video in the app. A licensed partner verifies your identity in minutes."
  },
  {
    step: 2,
    title: "Receive Your Credential",
    description:
      "Once verified, we issue a secure, encrypted proof of your identity that is stored in your personal digital wallet. You are the only one who controls it."
  },
{
    step: 3,
    title: "Reuse and Go",
    description:
      "Use your credential to instantly verify yourself with third-party apps and services with a single click, without re-sharing your private information."
  }
]
export default function Process() {
    return <div className="max-w-6xl flex flex-col justify-start items-start w-full mt-32 gap-5 lg:gap-8">
        <p className="text-sm text-primary">PROCESS</p>
        <h2 className="text-4xl lg:text-7xl">How it works</h2>
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        {process.map(p => <ProcessCard card={p} key={p.step}/>)}
        </section>
        </div>
}

function ProcessCard({card} : {card: {step: number, title:string, description :string}}){
    return <Card className="p-4 flex flex-col justify-start gap-4 h-[600px] relative">
        <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
            background: "radial-gradient(ellipse at bottom left, rgba(16, 185, 129, 0.32) 0%, rgba(16,24,16,0.85) 80%, transparent 100%)"
        }} />
        <span className="bg-white/80 rounded-full w-14 h-14 flex items-center justify-center text-black text-2xl font-extrabold">{card.step}</span>
        <section>
            <h3 className="text-2xl">{card.title}</h3>
            <p className="text-white/60 text-lg">{card.description}</p>
        </section>
    </Card>
}