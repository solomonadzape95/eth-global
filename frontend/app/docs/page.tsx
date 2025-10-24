"use client"

import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import logo from "@/assets/keystone-logo.svg";
import Image from "next/image";
import ConnectButton from "@/components/connect-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbarHide } from "@/hooks/use-navbar-hiding";
import { useAccount } from "wagmi";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Shield, 
  Users, 
  Zap, 
  Lock, 
  Globe,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Terminal
} from "lucide-react";
import { useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

const DASHBOARD_NAV_ITEMS = [
  { label: "Verifications", href: "/dashboard/verifications" },
  { label: "Activity", href: "/dashboard/activity" },
  { label: "API Docs", href: "/docs" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const scrollDirection = useNavbarHide();
  const { isConnected, isConnecting } = useAccount();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function Hamburger({ open }: { open: boolean }) {
    return (
      <div className="relative w-7 h-7 flex flex-col items-center justify-center">
        <span
          className={cn(
            "block absolute left-1/2 top-1/2 h-[3px] w-7 bg-white rounded transition-all duration-400 ease-in-out",
            open
              ? "rotate-45 -translate-x-1/2 -translate-y-1/2 scale-x-110"
              : "-translate-x-1/2 -translate-y-2"
          )}
        />
        <span
          className={cn(
            "block absolute left-1/2 top-1/2 h-[3px] w-7 bg-white rounded transition-all duration-400 ease-in-out",
            open
              ? "-rotate-45 -translate-x-1/2 -translate-y-1/2 scale-x-110"
              : "-translate-x-1/2 translate-y-2"
          )}
        />
      </div>
    );
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const CodeBlock = ({ children, id, language = "javascript" }: { children: string; id: string; language?: string }) => (
    <div className="relative group">
      <CodeEditor
        value={children}
        language={language}
        readOnly
        data-color-mode="dark"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        }}
        padding={24}
        minHeight={100}
      />
      <Button
        onClick={() => copyToClipboard(children, id)}
        className="absolute top-3 right-3 p-2 h-10 w-10 bg-white/10 hover:bg-white/20 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copiedCode === id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </Button>
      {copiedCode === id && (
        <div className="absolute top-3 right-16 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-medium">
          Copied!
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className={cn("fixed top-0 inset-x-0 z-40 bg-black/40 md:bg-transparent backdrop-blur-lg", scrollDirection === "down" ? "-translate-y-full" : "translate-y-0")}>
        <div className="mx-auto max-w-6xl px-6 lg:px-0 py-2 lg:py-8">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span
                className={cn(
                  "w-9 h-9 rounded-[7px] border border-white/10 p-1",
                  "bg-gradient-to-b from-[hsl(var(--primary)/0.88)] to-[hsl(var(--primary)/0.76)]",
                  "backdrop-blur-md shadow-[0_10px_30px_rgba(16,185,129,0.25)]",
                  "grid place-items-center text-sm font-semibold text-white"
                )}
              >
                <Image src={logo} width={100} height={100} alt="logo" />
              </span>
            </Link>

            <nav className="hidden md:flex">
              <div
                className={cn(
                  "rounded-2xl px-5 py-2",
                  "border border-white/5 backdrop-blur-md",
                  "bg-gradient-to-b from-white/10 to-white/5",
                  "shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
                )}
              >
                <ul className="flex items-center gap-8 text-lg text-white/90">
                  {DASHBOARD_NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center py-2 px-4 rounded-lg transition-all duration-200",
                          pathname === item.href
                            ? "text-white font-semibold"
                            : "hover:text-white/60 "
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:inline-flex"><ConnectButton onClick={() => {}} /></div>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                className={cn(
                  "md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-transparent text-white/80 transition-colors duration-300 focus:outline-none z-50"
                )}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <Hamburger open={open} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none fixed top-16 left-0 right-0 bottom-0 z-40 md:hidden",
            open && "pointer-events-auto"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300",
              open ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setOpen(false)}
          />
          <aside
            className={cn(
              "absolute left-0 top-0 w-full px-6 py-4 border-r border-white/10 bg-black/70 backdrop-blur-xl z-40 flex flex-col gap-8 transition-transform duration-300",
              "rounded-b-2xl shadow-[0_8px_28px_rgba(0,0,0,0.35)]",
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            style={{
              minHeight: "calc(100vh - 64px)",
              willChange: "transform, opacity",
            }}
          >
            <nav>
              <ul className="flex flex-col gap-5">
                {DASHBOARD_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-3xl font-semibold text-white font-thin hover:text-white/70 transition-colors",
                        pathname === item.href ? "text-white" : "text-white/80"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto">
              <ConnectButton onClick={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      </header>

      <main className="pt-4">
        <div className="p-0 overflow-hidden">
        <div className="min-h-screen flex flex-col p-4 lg:p-8 items-center relative">
        {/* Hero Section */}
        <div className="max-w-6xl flex flex-col justify-start items-start w-full gap-10 pt-48 lg:pt-96">
          <h1 className="text-6xl xl:text-8xl font-bold">API Documentation</h1>
          <p className="text-lg text-white/70">Integrate decentralized identity verification into your application with our comprehensive API. Build the future of identity verification.</p>
        </div>

        {/* Quick Start */}
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
          <p className="text-lg text-white/70 mb-8">
            Get started with Keystone API in just a few lines of code. Check if a user is verified:
          </p>
          <CodeBlock id="quickstart">
{`// Check if user is verified
const response = await fetch(
  'https://your-backend-url.com/simple-status?address=0x1234...'
);
const { isVerified } = await response.json();
console.log('User verified:', isVerified);`}
          </CodeBlock>
        </section>

        {/* API Endpoints */}
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-6">API Endpoints</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 flex flex-col justify-start gap-4 min-h-[400px] relative overflow-hidden group bg-gradient-to-b from-white/10 to-white/5 border-white/10 backdrop-blur-md hover:from-white/15 hover:to-white/10 transition-all duration-300">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold">Simple Status Check</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge label="GET" className="bg-green-500/20 text-green-400" />
                  <code className="text-sm text-white/60">/simple-status</code>
                </div>
                <p className="text-white/70 mb-4">
                  Check if a user has any verified identity without requiring signature.
                </p>
              </section>
              
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-white/60 text-sm">Parameters:</span>
                  <ul className="ml-4 text-white/80 text-sm">
                     <li>• address (required): User&apos;s wallet address</li>
                  </ul>
                </div>
                <div>
                  <span className="text-white/60 text-sm">Response:</span>
                  <CodeBlock id="simple-status">
{`{
  "isVerified": true,
  "cid": "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
}`}
                  </CodeBlock>
                </div>
              </div>
            </Card>

            <Card className="p-6 flex flex-col justify-start gap-4 min-h-[400px] relative overflow-hidden group bg-gradient-to-b from-white/10 to-white/5 border-white/10 backdrop-blur-md hover:from-white/15 hover:to-white/10 transition-all duration-300">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Get All Verifications</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge label="GET" className="bg-blue-500/20 text-blue-400" />
                  <code className="text-sm text-white/60">/verifications</code>
                </div>
                <p className="text-white/70 mb-4">
                  Retrieve all verification types for a user with consent checking.
                </p>
              </section>
              
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-white/60 text-sm">Parameters:</span>
                  <ul className="ml-4 text-white/80 text-sm">
                     <li>• address (required): User&apos;s wallet address</li>
                    <li>• requestedBy (optional): Your app identifier</li>
                  </ul>
                </div>
                <div>
                  <span className="text-white/60 text-sm">Response:</span>
                  <CodeBlock id="verifications">
{`{
  "walletAddress": "0x1234...",
  "verifications": [
    {
      "verification_type": "student",
      "is_verified": true,
      "consented": true,
      "university": "Stanford University",
      "student_id": "12345678"
    }
  ]
}`}
                  </CodeBlock>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Integration Examples */}
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-6">Integration Examples</h2>
          <div className="space-y-8">
            {/* JavaScript Example */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">JavaScript/TypeScript</h3>
              <CodeBlock id="js-example">
{`// Check if user is verified
async function checkUserVerification(walletAddress) {
  try {
    const response = await fetch(
      \`https://your-backend-url.com/simple-status?address=\${walletAddress}\`
    );
    const data = await response.json();
    return data.isVerified;
  } catch (error) {
    console.error('Verification check failed:', error);
    return false;
  }
}

// Get all user verifications
async function getUserVerifications(walletAddress, appId) {
  try {
    const response = await fetch(
      \`https://your-backend-url.com/verifications?address=\${walletAddress}&requestedBy=\${appId}\`
    );
    const data = await response.json();
    return data.verifications;
  } catch (error) {
    console.error('Failed to fetch verifications:', error);
    return [];
  }
}

// Check specific verification type
async function checkStudentStatus(walletAddress) {
  const verifications = await getUserVerifications(walletAddress, 'myapp');
  const studentVerification = verifications.find(v => v.verification_type === 'student');
  return studentVerification?.is_verified && studentVerification?.consented;
}`}
              </CodeBlock>
            </div>

            {/* React Hook Example */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">React Hook</h3>
              <CodeBlock id="react-example">
{`import { useState, useEffect } from 'react';

function useVerificationStatus(walletAddress) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) return;

    async function checkStatus() {
      try {
        const response = await fetch(
          \`/api/simple-status?address=\${walletAddress}\`
        );
        const data = await response.json();
        setIsVerified(data.isVerified);
      } catch (error) {
        console.error('Verification check failed:', error);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, [walletAddress]);

  return { isVerified, loading };
}`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Verification Types */}
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-6">Verification Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card className="p-6 flex flex-col justify-start gap-4 h-[200px] relative overflow-hidden group">
                <section>
                  <h4 className="text-xl font-bold text-white mb-2">Student Verification</h4>
                  <p className="text-white/70 mb-4">Educational platforms, student discounts</p>
                  <div className="text-sm text-white/60">
                    Fields: university, student_id, graduation_year
                  </div>
                </section>
              </Card>
              <Card className="p-6 flex flex-col justify-start gap-4 h-[200px] relative overflow-hidden group">
                <section>
                  <h4 className="text-xl font-bold text-white mb-2">Identity Verification</h4>
                  <p className="text-white/70 mb-4">Age-restricted services, KYC compliance</p>
                  <div className="text-sm text-white/60">
                    Fields: country, is_over_18, document_type
                  </div>
                </section>
              </Card>
              <Card className="p-6 flex flex-col justify-start gap-4 h-[200px] relative overflow-hidden group">
                <section>
                  <h4 className="text-xl font-bold text-white mb-2">Employment Verification</h4>
                  <p className="text-white/70 mb-4">Professional networks, job platforms</p>
                  <div className="text-sm text-white/60">
                    Fields: company, position, salary_range
                  </div>
                </section>
              </Card>
            </div>
            <div className="space-y-4">
              <Card className="p-6 flex flex-col justify-start gap-4 h-[200px] relative overflow-hidden group">
                <section>
                  <h4 className="text-xl font-bold text-white mb-2">Address Verification</h4>
                  <p className="text-white/70 mb-4">Financial services, delivery platforms</p>
                  <div className="text-sm text-white/60">
                    Fields: address, document_type
                  </div>
                </section>
              </Card>
              <Card className="p-6 flex flex-col justify-start gap-4 h-[200px] relative overflow-hidden group">
                <section>
                  <h4 className="text-xl font-bold text-white mb-2">Biometric Verification</h4>
                  <p className="text-white/70 mb-4">High-security applications</p>
                  <div className="text-sm text-white/60">
                    Fields: biometric_verified, liveness_score
                  </div>
                </section>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-6">Privacy & Security</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 flex flex-col justify-start gap-4 h-[300px] relative overflow-hidden group">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold">Privacy & Consent</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">User Control</h4>
                      <p className="text-sm text-white/70">Users control which verifications they share</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Decentralized Storage</h4>
                      <p className="text-sm text-white/70">Data stored on IPFS, not our servers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Revocable Consent</h4>
                      <p className="text-sm text-white/70">Users can revoke access anytime</p>
                    </div>
                  </div>
                </div>
              </section>
            </Card>

            <Card className="p-6 flex flex-col justify-start gap-4 h-[300px] relative overflow-hidden group">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold">Security Features</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Signature Verification</h4>
                      <p className="text-sm text-white/70">Cryptographic proof of user consent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Blockchain Proofs</h4>
                      <p className="text-sm text-white/70">Immutable verification records</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Rate Limiting</h4>
                      <p className="text-sm text-white/70">Protection against abuse</p>
                    </div>
                  </div>
                </div>
              </section>
            </Card>
          </div>
        </section>

        {/* Error Handling */}
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-6">Error Handling</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">400 Bad Request</h4>
              <p className="text-sm text-white/70">Missing required parameters</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">401 Unauthorized</h4>
              <p className="text-sm text-white/70">Invalid signature</p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">500 Server Error</h4>
              <p className="text-sm text-white/70">Server-side error</p>
            </div>
          </div>
          <CodeBlock id="error-example">
{`{
  "error": "address parameter is required"
}`}
          </CodeBlock>
        </section>

        {/* CTA */}
        <section className="w-full pt-20">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Integrate?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            Start building with Keystone API today. Join thousands of developers building the future of decentralized identity.
          </p>
          <div className="flex items-center flex-col lg:flex-row w-full lg:w-1/2 gap-3">
            <Button 
              className="flex items-center gap-2 w-full h-12 text-lg font-semibold rounded-2xl text-white border border-white/10 backdrop-blur-md bg-gradient-to-b hover:from-[hsl(var(--primary)/0.39)] hover:to-[hsl(var(--primary)/0.32)] shadow-[0_8px_28px_rgba(16,185,129,0.25)] from-[hsl(var(--primary)/0.48)] to-[hsl(var(--primary)/0.56)]"
            >
              <Terminal className="w-5 h-5" />
              View Full Documentation
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button 
              className="flex items-center gap-2 w-full h-12 text-lg font-semibold rounded-2xl text-white/90 border border-white/10 backdrop-blur-md bg-gradient-to-b from-white/10 to-white/5 shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:from-white/12 hover:to-white/7"
              onClick={() => window.location.href = '/api-explorer'}
            >
              <Code className="w-5 h-5" />
              Try API Explorer
            </Button>
          </div>
        </section>
        </div>
        <Footer />
        </div>
      </main>
    </div>
  );
}
