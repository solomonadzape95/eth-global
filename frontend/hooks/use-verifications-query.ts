"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from "wagmi";
import { verificationTypes } from "@/components/verifications/verification-data";
import { getUserVerifications, startVerification, type UserVerificationsResponse, type VerificationData as APIVerificationData, type StartVerificationResponse } from "@/lib/api";

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

// Query key factory
const verificationKeys = {
  all: ['verifications'] as const,
  user: (address: string) => [...verificationKeys.all, 'user', address] as const,
  status: (address: string) => [...verificationKeys.all, 'status', address] as const,
};

// Fetch verifications with caching
export function useVerificationsQuery() {
  const { address, isConnected } = useAccount();
  
  return useQuery({
    queryKey: verificationKeys.user(address || ''),
    queryFn: async (): Promise<VerificationData[]> => {
      if (!address) return verificationTypes as VerificationData[];
      
      const data = await getUserVerifications(address);
      
      // Update verification types with real status based on verification type
      const updatedVerifications = verificationTypes.map(verification => {
        // Find matching verification by type
        const matchingVerification = data.verifications?.find((v: APIVerificationData) => 
          v.verification_type === verification.id
        );
        
        if (matchingVerification) {
          return {
            ...verification,
            status: (matchingVerification.is_verified ? "added" : "not-added") as "added" | "not-added" | "coming-soon",
            addedDate: matchingVerification.is_verified ? matchingVerification.verified_at : undefined,
            cid: matchingVerification.cid,
            baseTxHash: matchingVerification.transactionHash || matchingVerification.baseTxHash,
            isVerified: matchingVerification.is_verified,
            verificationType: matchingVerification.verification_type,
            consented: matchingVerification.consented,
            message: matchingVerification.message
          };
        }
        
        // EXPLICITLY set to not-added if no matching verification found
        return {
          ...verification,
          status: "not-added" as "added" | "not-added" | "coming-soon",
          addedDate: undefined,
          consented: false
        };
      });
      
      return updatedVerifications;
    },
    enabled: isConnected && !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation for starting verification
export function useStartVerificationMutation() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  
  return useMutation({
    mutationFn: async ({ verificationType }: { verificationType: string }): Promise<StartVerificationResponse> => {
      if (!address) throw new Error('No wallet connected');
      return await startVerification(address, verificationType);
    },
    onSuccess: () => {
      // Invalidate and refetch verifications
      if (address) {
        queryClient.invalidateQueries({ queryKey: verificationKeys.user(address) });
        queryClient.invalidateQueries({ queryKey: verificationKeys.status(address) });
      }
    },
    onError: (error) => {
      console.error('Verification failed:', error);
    },
  });
}

// Simple status query
export function useSimpleStatusQuery() {
  const { address, isConnected } = useAccount();
  
  return useQuery({
    queryKey: verificationKeys.status(address || ''),
    queryFn: async () => {
      if (!address) return { isVerified: false };
      return await getUserVerifications(address);
    },
    enabled: isConnected && !!address,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
  });
}
