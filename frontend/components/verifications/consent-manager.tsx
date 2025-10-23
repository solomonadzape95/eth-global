"use client"

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { verificationTypes } from "./verification-data";

interface ConsentManagerProps {
  onConsentChange?: (verificationType: string, consented: boolean) => void;
}

export function ConsentManager({ onConsentChange }: ConsentManagerProps) {
  const { address, isConnected } = useAccount();
  const [consents, setConsents] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing consents (in a real app, this would come from the smart contract)
  useEffect(() => {
    if (isConnected && address) {
      // For demo purposes, we'll use localStorage
      // In production, this would query the smart contract
      const savedConsents = localStorage.getItem(`consents_${address}`);
      if (savedConsents) {
        setConsents(JSON.parse(savedConsents));
      }
    }
  }, [address, isConnected]);

  const handleConsentChange = async (verificationType: string, consented: boolean) => {
    if (!address) return;

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the smart contract
      // For demo purposes, we'll use localStorage
      const newConsents = { ...consents, [verificationType]: consented };
      setConsents(newConsents);
      
      // Save to localStorage for demo
      localStorage.setItem(`consents_${address}`, JSON.stringify(newConsents));
      
      // Call the callback if provided
      onConsentChange?.(verificationType, consented);
      
      console.log(`Consent ${consented ? 'given' : 'revoked'} for ${verificationType}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update consent');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Sharing</CardTitle>
          <CardDescription>
            Connect your wallet to manage verification sharing preferences.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Verification Sharing</CardTitle>
        <CardDescription>
          Control which verifications you share with third-party applications. 
          You can change these settings at any time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {verificationTypes.map((verification) => (
          <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <verification.icon className="h-5 w-5" />
                <h3 className="font-medium">{verification.title}</h3>
                <Badge variant={consents[verification.id] ? "default" : "secondary"}>
                  {consents[verification.id] ? "Shared" : "Private"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{verification.description}</p>
            </div>
            
            <Switch
              checked={consents[verification.id] || false}
              onCheckedChange={(checked) => handleConsentChange(verification.id, checked)}
              disabled={loading}
            />
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500">
            <strong>Note:</strong> When you share a verification, third-party applications 
            can verify that you have completed that specific verification type. 
            They cannot access your personal documents or detailed information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
