"use client"

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

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const CodeBlock = ({ children, id }: { children: string; id: string }) => (
    <div className="relative">
      <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => copyToClipboard(children, id)}
        className="absolute top-2 right-2 p-1 h-8 w-8"
      >
        {copiedCode === id ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );

  return (
    <div className="p-0 overflow-hidden">
      <div className="min-h-screen flex flex-col p-4 lg:p-8 items-center relative">
        {/* Header */}
        <div className="max-w-6xl flex flex-col justify-start items-start w-full gap-10 pt-48 lg:pt-96">
          <h1 className="text-6xl xl:text-8xl font-bold">API Documentation</h1>
          <p className="text-lg text-white/70">Integrate decentralized identity verification into your application with our comprehensive API. Build the future of identity verification.</p>

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
            <Card className="p-6 flex flex-col justify-start gap-4 h-[400px] relative overflow-hidden group">
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
                    <li>• address (required): User's wallet address</li>
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

            <Card className="p-6 flex flex-col justify-start gap-4 h-[400px] relative overflow-hidden group">
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
                    <li>• address (required): User's wallet address</li>
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
              variant="glassPrimary" 
              size="lg"
              className="flex items-center gap-2 w-full"
            >
              <Terminal className="w-5 h-5" />
              View Full Documentation
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button 
              variant="glassNeutral" 
              size="lg"
              className="flex items-center gap-2 w-full"
              onClick={() => window.location.href = '/api-explorer'}
            >
              <Code className="w-5 h-5" />
              Try API Explorer
            </Button>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
