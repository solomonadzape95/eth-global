"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const faqs = [
  {
    head: "Do you store my ID card or selfie?",
    body:
      "No. Your raw documents are sent directly to our licensed verification partner and deleted from our servers immediately after the check is complete. We only store a secure proof (hash) that contains no personal information.",
  },
  {
    head: "Who controls my data?",
    body:
      "You do. The encrypted proof is issued directly to you and stored in your wallet or on your device. You have full control to use it or revoke it at any time.",
  },
  {
    head: "Is this secure?",
    body:
      "Yes. We use strong encryption and record proofs on a secure registry or blockchain to prevent tampering. By minimizing the data we store, we lower the risk of data leaks.",
  },
  {
    head: "Can I use this for both crypto (Web3) and regular (Web2) apps?",
    body:
      "Yes. Our platform is designed to bridge both Web2 and Web3, allowing you to use your identity across the entire internet.",
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const handleToggle = (index: number) => setOpenItem((prev) => (prev === index ? null : index));

  return (
    <section id="faq" className="w-full max-w-6xl mx-auto mt-24 lg:mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left heading */}
        <div className="space-y-4">
          <p className="text-sm text-primary">ANSWERS</p>
          <h2 className="text-4xl lg:text-7xl">FAQs</h2>
          <p className="text-white/70">Everything you need to know about privacy, security and usage.</p>
          <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a>
        </div>

        {/* Right accordion list */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const open = openItem === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleToggle(index)}
                className="text-left"
              >
                <div
                  className={[
                    "w-full rounded-2xl px-5 py-4",
                    "border border-white/10 bg-white/6 backdrop-blur-md",
                    "flex items-center justify-between gap-4",
                    "shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
                  ].join(" ")}
                >
                  <span className="text-base lg:text-lg font-medium text-white/90 pr-6">{faq.head}</span>
                  <span className="shrink-0 w-8 h-8 grid place-items-center rounded-full bg-white/10 border border-white/10">
                    {open ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                <div
                  className={[
                    "grid transition-all duration-300",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pt-3 pb-1 text-white/70">{faq.body}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}


