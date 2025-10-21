import { Router } from "express";
import { z } from "zod";
import { getMockVerification } from "../services/mockKyc.js";
import { uploadToLighthouse } from "../services/lighthouse.js";
import { mintAttestation, checkAttestation } from "../services/hedera.js";
import { mintAttestation as mockMintAttestation, checkAttestation as mockCheckAttestation } from "../services/mockHedera.js";
import { StartVerificationBody, StartVerificationResponse, CheckStatusResponse } from "../types/index.js";

const router = Router();

const bodySchema = z.object({
  walletAddress: z.string().min(3),
});

router.post("/start-verification", async (req, res) => {
  try {
    const parsed = bodySchema.safeParse(req.body as StartVerificationBody);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid request body", issues: parsed.error.issues });
    }

    const { walletAddress } = parsed.data;
    
    // Step 1: Get mock KYC data
    const mockData = await getMockVerification(walletAddress);
    
    // Step 2: Upload to Lighthouse (if API key is available)
    let cid: string | undefined;
    try {
      cid = await uploadToLighthouse(mockData);
    } catch (error) {
      console.warn("Lighthouse upload failed, continuing without CID:", error);
      // Continue without CID for development
    }
    
    // Step 3: Mint attestation on Hedera (if CID and Hedera config available)
    let hederaTxHash: string | undefined;
    if (cid) {
      try {
        // Check if Hedera is configured
        if (process.env.HEDERA_RPC_URL && process.env.HEDERA_PRIVATE_KEY && process.env.HEDERA_CONTRACT_ADDRESS) {
          hederaTxHash = await mintAttestation(walletAddress, cid);
        } else {
          console.log("Hedera not configured, using mock service");
          hederaTxHash = await mockMintAttestation(walletAddress, cid);
        }
      } catch (error) {
        console.warn("Hedera minting failed, continuing without tx hash:", error);
        // Continue without Hedera tx hash for development
      }
    }
    
    // Step 4: Return response with CID and Hedera tx hash (if available)
    const response: StartVerificationResponse = {
      ...mockData,
      ...(cid && { cid }),
      ...(hederaTxHash && { hederaTxHash })
    };
    
    return res.json(response);
  } catch (err) {
    console.error("/start-verification error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /verifications endpoint - get all verifications for a user
router.get("/verifications", async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ message: "Address query parameter is required" });
    }

    // Check attestation on Hedera
    let attestation;
    if (process.env.HEDERA_RPC_URL && process.env.HEDERA_CONTRACT_ADDRESS) {
      attestation = await checkAttestation(address);
    } else {
      console.log("Hedera not configured, using mock service");
      attestation = await mockCheckAttestation(address);
    }
    
    // Return all verification data for the user
    const response = {
      walletAddress: address,
      verifications: [{
        is_verified: attestation.isValid,
        cid: attestation.hasAttestation ? attestation.cid : undefined,
        status: attestation.isValid ? "Verified" : "Not Verified",
        verified_at: attestation.isValid ? new Date().toISOString() : undefined
      }]
    };
    
    return res.json(response);
  } catch (err) {
    console.error("/verifications error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /check-status endpoint
router.get("/check-status", async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ message: "Address query parameter is required" });
    }

    // Check attestation on Hedera
    let attestation;
    if (process.env.HEDERA_RPC_URL && process.env.HEDERA_CONTRACT_ADDRESS) {
      attestation = await checkAttestation(address);
    } else {
      console.log("Hedera not configured, using mock service");
      attestation = await mockCheckAttestation(address);
    }
    
    const response: CheckStatusResponse = {
      is_verified: attestation.isValid,
      cid: attestation.hasAttestation ? attestation.cid : undefined
    };
    
    return res.json(response);
  } catch (err) {
    console.error("/check-status error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

