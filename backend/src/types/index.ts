export interface MockKycResult {
  status: "Verified" | "Unverified";
  walletAddress: string;
  is_over_18: boolean;
  country: string;
  verified_at: string;
}

export interface StartVerificationBody {
  walletAddress: string;
}

export interface StartVerificationResponse extends MockKycResult {
  cid?: string;
  hederaTxHash?: string;
}

export interface CheckStatusResponse {
  is_verified: boolean;
  cid?: string;
  hederaTxHash?: string;
}

