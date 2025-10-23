"use client"

import { useAccount } from "wagmi";
import { useSimpleStatusQuery, useStartVerificationMutation } from "./use-verifications-query";
import { type CheckStatusResponse, type StartVerificationResponse } from "@/lib/api";

export function useVerification(verificationType?: string) {
  const { address, isConnected } = useAccount();
  const { data: status, isLoading: loading, error, refetch: fetchStatus } = useSimpleStatusQuery();
  const startVerificationMutation = useStartVerificationMutation();

  const beginVerification = async () => {
    if (!address || !verificationType) return;
    
    try {
      const result = await startVerificationMutation.mutateAsync({ verificationType });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { 
    loading: loading || startVerificationMutation.isPending, 
    status, 
    error: error?.message || startVerificationMutation.error?.message || null, 
    fetchStatus, 
    beginVerification 
  };
}

