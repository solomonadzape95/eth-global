import { BACKEND_URL } from "@/config";
import { apiFetch } from "@/lib/utils";

export interface StartVerificationResponse {
  status: string;
  walletAddress: string;
  is_over_18: boolean;
  country: string;
  verified_at: string;
  cid: string;
  baseTxHash: string;
}

export interface CheckStatusResponse {
  is_verified: boolean;
  cid?: string;
}

export interface VerificationData {
  verification_type: string;
  is_verified: boolean;
  cid?: string;
  verified_at?: string;
  consented: boolean;
  message?: string;
  error?: string;
  // Additional fields based on verification type
  university?: string;
  student_id?: string;
  country?: string;
  is_over_18?: boolean;
  company?: string;
  position?: string;
  [key: string]: any;
}

export interface UserVerificationsResponse {
  walletAddress: string;
  verifications: VerificationData[];
  requestedBy?: string;
}

export async function startVerification(address: string, verificationType: string = "identity-verification") {
  return apiFetch<StartVerificationResponse>(`${BACKEND_URL}/start-verification`, {
    method: "POST",
    body: JSON.stringify({ walletAddress: address, verificationType })
  })
}

export async function checkStatus(address: string, signature: string) {
  return apiFetch<CheckStatusResponse>(`${BACKEND_URL}/check-status?address=${address}&signature=${signature}`)
}

export async function getUserVerifications(address: string, requestedBy?: string) {
  const url = requestedBy 
    ? `${BACKEND_URL}/verifications?address=${address}&requestedBy=${requestedBy}`
    : `${BACKEND_URL}/verifications?address=${address}`;
  
  return apiFetch<UserVerificationsResponse>(url);
}

export async function getSimpleStatus(address: string) {
  return apiFetch<CheckStatusResponse>(`${BACKEND_URL}/simple-status?address=${address}`);
}

