"use client";

import * as React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineFactCheck } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { BsPersonVideo } from "react-icons/bs";
import { FaRegAddressCard, FaTrello, FaDropbox, FaJira, FaLock, FaKey } from "react-icons/fa";
import { FaGoogle, FaMicrosoft, FaSlack, FaGithub } from "react-icons/fa6";
import { SiNotion, SiZendesk } from "react-icons/si";

export function IconBubble({
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
        boxShadow: "0 0 32px 2px rgba(0,0,0,0.24), 0 2px 32px 0 #63ebbb22",
        background: "radial-gradient(circle at 65% 35%, #fff3 0%, #222a 62%, #000e 95%)",
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

export function Step1IconBubbles() {
  return (
    <div className="relative min-w-[265px] min-h-[305px] mx-auto my-2" aria-label="Identity check icon group">
      <IconBubble icon={FaRegAddressCard} size={84} className="absolute delay-100  pulse-scale" style={{ right: "10%", top: "40%", zIndex: 2 }} />
      <IconBubble icon={BsPersonVideo} size={77} className="absolute  pulse-scale" style={{ left: "60%", top: "4%" }} />
      <IconBubble icon={MdOutlineFactCheck} size={72} className="absolute delay-300  pulse-scale" style={{ left: "9%", top: "18%" }} />
      <IconBubble icon={PiIdentificationBadge} size={76} className="absolute delay-500  pulse-scale" style={{ left: "2%", bottom: "10%" }} />
      <IconBubble icon={HiOutlinePhotograph} size={64} className="absolute delay-300  pulse-scale" style={{ right: "33%", bottom: "8%" }} />
    </div>
  );
}

export function Step3IconBubbles() {
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
  const doubledLogos = [...logos, ...logos];

  return (
    <div className="relative flex items-center min-w-[265px] min-h-[305px] mx-auto my-2" aria-label="Third-party app logo group">
      <div className="flex flex-col gap-6 relative">
        <div className="w-full h-full marquee flex gap-5 items-center justify-center" style={{ animationDelay: "8s", animationDuration: "34s" }}>
          {doubledLogos.reverse().map(({ logo: Logo }, idx) => (
            <div key={idx} className="flex items-center justify-center relative" style={{ minWidth: 70, minHeight: 70, zIndex: 10 }}>
              <IconBubble icon={Logo} size={70} iconProps={{ color: "#fff" }} />
            </div>
          ))}
        </div>
        <div className="w-full h-full  marquee flex gap-5 items-center justify-center" style={{ animationDelay: "4s", animationDuration: "34s" }}>
          {doubledLogos.map(({ logo: Logo }, idx) => (
            <div key={idx} className="flex items-center justify-center relative" style={{ minWidth: 70, minHeight: 70, zIndex: 10 }}>
              <IconBubble icon={Logo} size={70} iconProps={{ color: "#fff" }} />
            </div>
          ))}
        </div>
        <div className="w-full h-full marquee  flex gap-5 items-center justify-center" style={{ animationDuration: "34s" }}>
          {doubledLogos.map(({ logo: Logo }, idx) => (
            <div key={idx} className="flex items-center justify-center relative" style={{ minWidth: 70, minHeight: 70, zIndex: 10 }}>
              <IconBubble icon={Logo} size={70} iconProps={{ color: "#fff" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Step2IconBubbles() {
  return (
    <div className="relative min-w-[265px] min-h-[305px] mx-auto my-2 rotate-pause" aria-label="Identity check icon group">
      <IconBubble icon={FaLock} size={120} className="absolute delay-100  pulse-scale" style={{ right: "10%", top: "60%", zIndex: 2 }} />
      <IconBubble icon={FaKey} size={120} className="absolute  pulse-scale" style={{ left: "10%", top: "20%" }} />
    </div>
  );
}


