"use client"

import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserVerifications, getSimpleStatus } from "@/lib/api";
import { type UserVerificationsResponse, type CheckStatusResponse } from "@/lib/api";

export default function DemoPage() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [verifications, setVerifications] = useState<UserVerificationsResponse | null>(null);
  const [simpleStatus, setSimpleStatus] = useState<CheckStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkUserVerifications = async () => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUserVerifications(address, "demo-dapp");
      setVerifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch verifications');
    } finally {
      setLoading(false);
    }
  };

  const checkSimpleStatus = async () => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getSimpleStatus(address);
      setSimpleStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check status');
    } finally {
      setLoading(false);
    }
  };

  const checkStudentStatus = () => {
    if (!verifications) return false;
    
    const studentVerification = verifications.verifications.find(v => 
      v.verification_type === 'student' && v.consented
    );
    
    return studentVerification?.is_verified || false;
  };

  const checkIdentityStatus = () => {
    if (!verifications) return false;
    
    const identityVerification = verifications.verifications.find(v => 
      v.verification_type === 'identity-verification' && v.consented
    );
    
    return identityVerification?.is_verified || false;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Third-Party Integration Demo</h1>
          <p className="text-xl text-gray-600">
            This demonstrates how third-party applications can verify users using our identity platform.
          </p>
        </div>

        {!isConnected ? (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Please connect your wallet to test the third-party integration.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* API Testing Section */}
            <Card>
              <CardHeader>
                <CardTitle>API Testing</CardTitle>
                <CardDescription>
                  Test the different API endpoints that third-party applications would use.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    onClick={checkSimpleStatus}
                    disabled={loading}
                  >
                    {loading ? "Checking..." : "Check Simple Status"}
                  </Button>
                  
                  <Button 
                    onClick={checkUserVerifications}
                    disabled={loading}
                  >
                    {loading ? "Fetching..." : "Get All Verifications"}
                  </Button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Simple Status Result */}
            {simpleStatus && (
              <Card>
                <CardHeader>
                  <CardTitle>Simple Status Check Result</CardTitle>
                  <CardDescription>
                    GET /simple-status?address={address}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge label={simpleStatus.is_verified ? "Verified" : "Not Verified"} />
                    {simpleStatus.cid && (
                      <span className="text-sm text-gray-500">CID: {simpleStatus.cid}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verifications Result */}
            {verifications && (
              <Card>
                <CardHeader>
                  <CardTitle>User Verifications Result</CardTitle>
                  <CardDescription>
                    GET /verifications?address={address}&requestedBy=demo-dapp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {verifications.verifications.map((verification, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium capitalize">
                            {verification.verification_type.replace('-', ' ')}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {verification.consented ? "Shared with 3rd parties" : "Private"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge label={verification.isVerified ? "Verified" : "Not Verified"} />
                          <Badge label={verification.consented ? "Consented" : "No Consent"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Logic Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Business Logic Examples</CardTitle>
                <CardDescription>
                  How a third-party application would use the verification data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Student Discount Check</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Check if user is a verified student for discount eligibility.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge label={checkStudentStatus() ? "Eligible for Student Discount" : "Not Eligible"} />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">KYC Compliance Check</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Check if user has completed identity verification for compliance.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge label={checkIdentityStatus() ? "KYC Compliant" : "KYC Required"} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Code Example</CardTitle>
                <CardDescription>
                  How to integrate this into your own application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Check if user is a student
const checkStudentStatus = async (walletAddress) => {
  const response = await fetch(
    \`https://your-api.com/verifications?address=\${walletAddress}\`
  );
  const data = await response.json();
  
  const studentVerification = data.verifications.find(v => 
    v.verification_type === 'student' && v.consented
  );
  
  return studentVerification?.is_verified || false;
};

// Use in your app
const isStudent = await checkStudentStatus(userAddress);
if (isStudent) {
  showStudentDiscount();
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
