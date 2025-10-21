import { MockKycResult } from "../types/index.js";

export async function getMockVerification(walletAddress: string): Promise<MockKycResult> {
  await new Promise((res) => setTimeout(res, 2000));

  const result: MockKycResult = {
    status: "Verified",
    walletAddress,
    is_over_18: true,
    country: "NG",
    verified_at: new Date().toISOString(),
  };

  return result;
}

