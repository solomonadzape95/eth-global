import { BACKEND_URL } from "@/config";
import { apiFetch } from "@/lib/utils";

export interface StartVerificationResponse {
  status: string;
  walletAddress: string;
  is_over_18: boolean;
  country: string;
  verified_at: string;
  cid?: string;
  hederaTxHash?: string;
}

export interface CheckStatusResponse {
  is_verified: boolean;
  cid?: string;
}

export async function startVerification(address: string) {
  return apiFetch<StartVerificationResponse>(`${BACKEND_URL}/start-verification`, {
    method: "POST",
    body: JSON.stringify({ walletAddress: address })
  })
}

export async function checkStatus(address: string) {
  return apiFetch<CheckStatusResponse>(`${BACKEND_URL}/check-status?address=${address}`)
}

