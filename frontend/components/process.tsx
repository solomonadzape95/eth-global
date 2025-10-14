"use client";
import { Card } from "./ui/card";
import { ReactNode } from "react";
import { Step1IconBubbles, Step2IconBubbles, Step3IconBubbles } from "./process-parts";

const process = [
    {
        step: 1,
        display: <Step1IconBubbles />,
        title: "Scan & Verify",
        description:
            "Securely scan your government ID and complete a quick selfie video in the app. A licensed partner verifies your identity in minutes.",
    },
    {
        step: 2,
        display: <Step2IconBubbles />,
        title: "Receive Your Credential",
        description:
            "Once verified, we issue a secure, encrypted proof of your identity that is stored in your personal digital wallet. You are the only one who controls it.",
    },
    {
        step: 3,
        display: <Step3IconBubbles />,
        title: "Reuse and Go",
        description:
            "Use your credential to instantly verify yourself with third-party apps and services with a single click, without re-sharing your private information.",
    },
];

export default function Process() {
    return (
        <div className="max-w-6xl flex flex-col justify-start items-start w-full mt-32 gap-5 lg:gap-8">
            <p className="text-sm text-primary">PROCESS</p>
            <h2 className="text-4xl lg:text-7xl">How it works</h2>
            <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
                {process.map((p) => (
                    <ProcessCard card={p} key={p.step} />
                ))}
            </section>
        </div>
    );
}

function ProcessCard({
    card,
}: {
    card: { step: number; title: string; description: string; display: ReactNode };
}) {
    return (
        <Card className="p-4 flex flex-col justify-start gap-4 h-[600px] relative overflow-hidden">
            <div
                className="absolute rounded-full pointer-events-none w-[500px] h-[500px] -translate-x-1/2 -bottom-[160px] z-10"
                style={{
                    background:
                        "radial-gradient(circle at center, hsl(var(--primary)/0.13) 0%, transparent 70%, transparent 100%)",
                    mixBlendMode: "lighten",
                    filter: "blur(12px)",
                    opacity: 0.9,
                }}
            />
            <span className="bg-white/80 rounded-full w-14 h-14 flex items-center justify-center text-black text-2xl font-extrabold">
                {card.step}
            </span>
            <section>
                <h3 className="text-2xl">{card.title}</h3>
                <p className="text-white/60 text-lg">{card.description}</p>
            </section>
            <section className="w-full ">{card.display}</section>
        </Card>
    );
}