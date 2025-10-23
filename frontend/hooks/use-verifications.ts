"use client"

import { useVerificationsQuery } from "./use-verifications-query";

interface VerificationStatus {
  is_verified: boolean;
  cid?: string;
}

interface VerificationData {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "added" | "not-added" | "coming-soon";
  addedDate?: string;
  cid?: string;
  baseTxHash?: string;
  isVerified?: boolean;
  verificationType?: string;
  consented?: boolean;
  message?: string;
}

export function useVerifications() {
  const { data: verifications = [], isLoading: loading, error, refetch: fetchVerifications } = useVerificationsQuery();
  
  return { 
    loading, 
    verifications, 
    error: error?.message || null, 
    fetchVerifications 
  };
}
