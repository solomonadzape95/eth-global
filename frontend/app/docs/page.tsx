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
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Keystone API Documentation
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Integrate decentralized identity verification into your application with our comprehensive API
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80">
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
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                Simple Status Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge label="GET" className="bg-green-500/20 text-green-400" />
                <code className="text-sm">/simple-status</code>
              </div>
              <p className="text-white/80 text-sm">
                Check if a user has any verified identity without requiring signature.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-white/60">Parameters:</span>
                  <ul className="ml-4 text-white/80">
                    <li>• address (required): User's wallet address</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <span className="text-white/60">Response:</span>
                  <CodeBlock id="simple-status">
{`{
  "isVerified": true,
  "cid": "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
}`}
                  </CodeBlock>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" />
                Get All Verifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge label="GET" className="bg-blue-500/20 text-blue-400" />
                <code className="text-sm">/verifications</code>
              </div>
              <p className="text-white/80 text-sm">
                Retrieve all verification types for a user with consent checking.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-white/60">Parameters:</span>
                  <ul className="ml-4 text-white/80">
                    <li>• address (required): User's wallet address</li>
                    <li>• requestedBy (optional): Your app identifier</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <span className="text-white/60">Response:</span>
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
            </CardContent>
          </Card>
        </div>

        {/* Integration Examples */}
        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-400" />
              Integration Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* JavaScript Example */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">JavaScript/TypeScript</h3>
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
              <h3 className="text-lg font-semibold mb-3 text-white">React Hook</h3>
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
          </CardContent>
        </Card>

        {/* Verification Types */}
        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              Verification Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Student Verification</h4>
                  <p className="text-sm text-white/80 mb-2">Educational platforms, student discounts</p>
                  <div className="text-xs text-white/60">
                    Fields: university, student_id, graduation_year
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Identity Verification</h4>
                  <p className="text-sm text-white/80 mb-2">Age-restricted services, KYC compliance</p>
                  <div className="text-xs text-white/60">
                    Fields: country, is_over_18, document_type
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Employment Verification</h4>
                  <p className="text-sm text-white/80 mb-2">Professional networks, job platforms</p>
                  <div className="text-xs text-white/60">
                    Fields: company, position, salary_range
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Address Verification</h4>
                  <p className="text-sm text-white/80 mb-2">Financial services, delivery platforms</p>
                  <div className="text-xs text-white/60">
                    Fields: address, document_type
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Biometric Verification</h4>
                  <p className="text-sm text-white/80 mb-2">High-security applications</p>
                  <div className="text-xs text-white/60">
                    Fields: biometric_verified, liveness_score
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-red-400" />
                Privacy & Consent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">User Control</h4>
                  <p className="text-sm text-white/80">Users control which verifications they share</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Decentralized Storage</h4>
                  <p className="text-sm text-white/80">Data stored on IPFS, not our servers</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Revocable Consent</h4>
                  <p className="text-sm text-white/80">Users can revoke access anytime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-yellow-400" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Signature Verification</h4>
                  <p className="text-sm text-white/80">Cryptographic proof of user consent</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Blockchain Proofs</h4>
                  <p className="text-sm text-white/80">Immutable verification records</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Rate Limiting</h4>
                  <p className="text-sm text-white/80">Protection against abuse</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Handling */}
        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              Error Handling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">400 Bad Request</h4>
                <p className="text-sm text-white/80">Missing required parameters</p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">401 Unauthorized</h4>
                <p className="text-sm text-white/80">Invalid signature</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">500 Server Error</h4>
                <p className="text-sm text-white/80">Server-side error</p>
              </div>
            </div>
            <CodeBlock id="error-example">
{`{
  "error": "address parameter is required"
}`}
            </CodeBlock>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Integrate?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Start building with Keystone API today. Join thousands of developers building the future of decentralized identity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="glassPrimary" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Terminal className="w-5 h-5" />
                View Full Documentation
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button 
                variant="glassLight" 
                size="lg"
                className="flex items-center gap-2"
                onClick={() => window.location.href = '/api-explorer'}
              >
                <Code className="w-5 h-5" />
                Try API Explorer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
