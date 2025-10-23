"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Terminal,
  Code,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

export default function APIExplorerPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const testAPI = async (endpoint: string, params: Record<string, string>) => {
    setLoading(true);
    setTestResults(null);
    
    try {
      const url = new URL(endpoint, window.location.origin);
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
      });
      
      const response = await fetch(url.toString());
      const data = await response.json();
      
      setTestResults({
        status: response.status,
        data: data,
        url: url.toString()
      });
    } catch (error) {
      setTestResults({
        status: 'error',
        data: { error: error instanceof Error ? error.message : 'Network error' },
        url: endpoint
      });
    } finally {
      setLoading(false);
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
          <h1 className="text-6xl xl:text-8xl font-bold">API Explorer</h1>
          <p className="text-lg text-white/70">Test the Keystone API endpoints directly in your browser. Build and test integrations in real-time.</p>

        <div className="w-full space-y-8">
          {/* API Endpoints */}
          <section className="w-full">
            <h2 className="text-3xl font-bold mb-6">Test API Endpoints</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Simple Status */}
              <Card className="p-6 flex flex-col justify-start gap-4 h-[400px] relative overflow-hidden group">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-6 h-6 text-green-400" />
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
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Wallet Address:</label>
                    <input
                      type="text"
                      placeholder="0x1234567890abcdef1234567890abcdef12345678"
                      className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50"
                      id="simple-status-address"
                    />
                  </div>
                  <Button 
                    onClick={() => {
                      const address = (document.getElementById('simple-status-address') as HTMLInputElement)?.value;
                      if (address) {
                        testAPI('/api/simple-status', { address });
                      }
                    }}
                    disabled={loading}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {loading ? 'Testing...' : 'Test Endpoint'}
                  </Button>
                </div>
              </Card>

              {/* Verifications */}
              <Card className="p-6 flex flex-col justify-start gap-4 h-[400px] relative overflow-hidden group">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-6 h-6 text-blue-400" />
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
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Wallet Address:</label>
                    <input
                      type="text"
                      placeholder="0x1234567890abcdef1234567890abcdef12345678"
                      className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50"
                      id="verifications-address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Requested By (optional):</label>
                    <input
                      type="text"
                      placeholder="myapp"
                      className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50"
                      id="verifications-requestedBy"
                    />
                  </div>
                  <Button 
                    onClick={() => {
                      const address = (document.getElementById('verifications-address') as HTMLInputElement)?.value;
                      const requestedBy = (document.getElementById('verifications-requestedBy') as HTMLInputElement)?.value;
                      if (address) {
                        testAPI('/api/verifications', { address, requestedBy });
                      }
                    }}
                    disabled={loading}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {loading ? 'Testing...' : 'Test Endpoint'}
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Results */}
          <section className="w-full">
            <h2 className="text-3xl font-bold mb-6">API Response</h2>
            <Card className="p-6 flex flex-col justify-start gap-4 h-[400px] relative overflow-hidden group">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  {testResults?.status === 'error' ? (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  ) : testResults ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <Terminal className="w-6 h-6 text-white/60" />
                  )}
                  <h3 className="text-xl font-bold">Response</h3>
                </div>
              </section>
              
              <div className="flex-1 space-y-4">
                {testResults ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Badge 
                        label={`Status: ${testResults.status}`} 
                        className={testResults.status === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/80">Request URL:</label>
                      <CodeBlock id="request-url">{testResults.url}</CodeBlock>
                    </div>
                    <div>
                      <label className="text-sm text-white/80">Response:</label>
                      <CodeBlock id="response-data">{JSON.stringify(testResults.data, null, 2)}</CodeBlock>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-white/60">
                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select an endpoint and click "Test Endpoint" to see results</p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          {/* Code Examples */}
          <section className="w-full">
            <h2 className="text-3xl font-bold mb-6">Code Examples</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">JavaScript/TypeScript</h3>
                <CodeBlock id="js-example">
{`// Check if user is verified
async function checkUserVerification(walletAddress) {
  try {
    const response = await fetch(
      \`/api/simple-status?address=\${walletAddress}\`
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
      \`/api/verifications?address=\${walletAddress}&requestedBy=\${appId}\`
    );
    const data = await response.json();
    return data.verifications;
  } catch (error) {
    console.error('Failed to fetch verifications:', error);
    return [];
  }
}`}
                </CodeBlock>
              </div>
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
        </div>

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
              onClick={() => window.location.href = '/docs'}
            >
              <Code className="w-5 h-5" />
              View Full Documentation
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
