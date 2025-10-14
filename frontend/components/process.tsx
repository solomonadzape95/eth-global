"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaDropbox, FaJira, FaRegAddressCard, FaTrello, FaLock, FaKey } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineFactCheck } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { BsPersonVideo } from "react-icons/bs";
import { Card } from "./ui/card";
import { ReactNode } from "react";
import { MdOutlineReplay } from "react-icons/md";

// Import React Icons for company logos (white color)
import { FaGoogle, FaMicrosoft, FaSlack, FaGithub } from "react-icons/fa6";
import { SiNotion, SiZendesk } from "react-icons/si";

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

function IconBubble({
    icon: Icon,
    size = 64,
    className = "",
    style = {},
    iconProps = {},
}: {
    icon: React.ElementType;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
    iconProps?: any;
}) {
    return (
        <div
            className={
                "flex items-center justify-center rounded-full bg-white/10 shadow-xl backdrop-blur-md border-border border-white/5" +
                " " +
                className
            }
            style={{
                width: size,
                height: size,
                ...style,
                boxShadow:
                    "0 0 32px 2px rgba(0,0,0,0.24), 0 2px 32px 0 #63ebbb22",
                background:
                    "radial-gradient(circle at 65% 35%, #fff3 0%, #222a 62%, #000e 95%)",
            }}
        >
            <Icon
                size={size * 0.48}
                color="#F3F4F6"
                style={{ filter: "drop-shadow(0 2px 1.5px #111a  )" }}
                {...iconProps}
            />
        </div>
    );
}

function Step1IconBubbles() {
    return (
        <div
            className="relative min-w-[265px] min-h-[305px] mx-auto my-2"
            aria-label="Identity check icon group"
        >
            {/* Center bubble - ID Card */}
            <IconBubble
                icon={FaRegAddressCard}
                size={84}
                className="absolute delay-100  pulse-scale"
                style={{
                    right: "10%",
                    top: "40%",
                    zIndex: 2,
                }}
            />
            {/* Top right bubble */}
            <IconBubble
                icon={BsPersonVideo}
                size={77}
                className="absolute  pulse-scale"
                style={{
                    left: "60%",
                    top: "4%",
                }}
            />
            {/* Top left bubble */}
            <IconBubble
                icon={MdOutlineFactCheck}
                size={72}
                className="absolute delay-300  pulse-scale"
                style={{
                    left: "9%",
                    top: "18%",
                }}
            />
            {/* Bottom left bubble */}
            <IconBubble
                icon={PiIdentificationBadge}
                size={76}
                className="absolute delay-500  pulse-scale"
                style={{
                    left: "2%",
                    bottom: "10%",
                }}
            />
            {/* Bottom right bubble */}
            <IconBubble
                icon={HiOutlinePhotograph}
                size={64}
                className="absolute delay-300  pulse-scale"
                style={{
                    right: "33%",
                    bottom: "8%",
                }}
            />
        </div>
    );
}

// No need for the SVG and image logo logic, use React Icons directly.
function Step3IconBubbles() {
    // List of react-icons for third-party logos, all white
    const logos = [
        { logo: FaGoogle, label: "Google" },
        { logo: FaMicrosoft, label: "Microsoft" },
        { logo: FaSlack, label: "Slack" },
        { logo: FaGithub, label: "GitHub" },
        { logo: FaTrello, label: "Trello" },
        { logo: FaDropbox, label: "Dropbox" },
        { logo: FaJira, label: "Jira" },
        { logo: SiNotion, label: "Notion" },
        { logo: SiZendesk, label: "Zendesk" },
    ];
    // double for marquee loop styling
    const doubledLogos = [...logos, ...logos];

    return (
        <div
            className="relative flex items-center min-w-[265px] min-h-[305px] mx-auto my-2"
            aria-label="Third-party app logo group"
        >
            <div className="flex flex-col gap-6 relative">
                
                <div
                    className={`
            w-full h-full marquee
            flex
            gap-5
            items-center
            justify-center
          `}
                    style={{ animationDelay: "8s", animationDuration: "34s" }}
                >
                    {doubledLogos.reverse().map(({ logo: Logo, label }, idx) => (
                        <div
                            key={idx}
                            className={`
                  flex items-center justify-center
                  relative
                `}
                            style={{
                                minWidth: 70,
                                minHeight: 70,
                                zIndex: 10,
                            }}
                        >
                            <IconBubble
                                icon={Logo}
                                size={70}
                                className=""
                                iconProps={{ color: "#fff" }}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={`
            w-full h-full  marquee
            flex
            gap-5
            items-center
            justify-center
          `}
                    style={{ animationDelay: "4s", animationDuration: "34s" }}
                >
                    {doubledLogos.map(({ logo: Logo, label }, idx) => (
                        <div
                            key={idx}
                            className={`
                  flex items-center justify-center
                  relative
                `}
                            style={{
                                minWidth: 70,
                                minHeight: 70,
                                zIndex: 10,
                            }}
                        >
                            <IconBubble
                                icon={Logo}
                                size={70}
                                className=""
                                iconProps={{ color: "#fff" }}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={`
            w-full h-full marquee 
            flex
            gap-5
            items-center
            justify-center
          `}
             style={{ animationDuration: "34s"}}  
             >
                    {doubledLogos.map(({ logo: Logo, label }, idx) => (
                        <div
                            key={idx}
                            className={`
                  flex items-center justify-center
                  relative
                `}
                            style={{
                                minWidth: 70,
                                minHeight: 70,
                                zIndex: 10,
                            }}
                        >
                            <IconBubble
                                icon={Logo}
                                size={70}
                                className=""
                                iconProps={{ color: "#fff" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
function Step2IconBubbles() {
    return (
        <div
            className="relative min-w-[265px] min-h-[305px] mx-auto my-2 rotate-pause"
            aria-label="Identity check icon group"
        >
            {/* Center bubble - ID Card */}
            <IconBubble
                icon={FaLock}
                size={120}
                className="absolute delay-100  pulse-scale"
                style={{
                    right: "10%",
                    top: "60%",
                    zIndex: 2,
                }}
            />
            {/* Top right bubble */}
            <IconBubble
                icon={FaKey}
                size={120}
                className="absolute  pulse-scale"
                style={{
                    left: "10%",
                    top: "20%",
                }}
            />
            </div>)
}