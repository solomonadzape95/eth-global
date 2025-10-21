import { ethers } from "ethers";

// Contract ABI - minimal interface for our functions
const CONTRACT_ABI = [
  "function mintAttestation(address user, string memory cid) external",
  "function checkAttestation(address user) external view returns (bool hasAttestation, string memory cid, bool isValid)",
  "function userAttestations(address) external view returns (string)",
  "function isRevoked(string) external view returns (bool)"
];

export async function mintAttestation(walletAddress: string, cid: string): Promise<string> {
  const rpcUrl = process.env.HEDERA_RPC_URL;
  const privateKey = process.env.HEDERA_PRIVATE_KEY;
  const contractAddress = process.env.HEDERA_CONTRACT_ADDRESS;

  if (!rpcUrl || !privateKey || !contractAddress) {
    throw new Error("Missing Hedera configuration. Please set HEDERA_RPC_URL, HEDERA_PRIVATE_KEY, and HEDERA_CONTRACT_ADDRESS");
  }

  try {
    console.log("Attempting to connect to Hedera RPC:", rpcUrl);
    
    // Create provider with explicit network configuration for Hedera
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl, {
      name: "hedera-testnet",
      chainId: 296, // Hedera testnet chain ID
    });
    
    // Test the connection first
    const network = await provider.getNetwork();
    console.log("Connected to network:", network);
    
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet);

    // Call mintAttestation function
    const tx = await contract.mintAttestation(walletAddress, cid);
    
    console.log("Hedera transaction submitted:", tx.hash);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    console.log("Hedera transaction confirmed:", receipt.transactionHash);
    
    return receipt.transactionHash;
  } catch (error) {
    console.error("Hedera mintAttestation error:", error);
    // If it's a network error, provide more helpful message
    if (error instanceof Error && error.message.includes('could not detect network')) {
      throw new Error(`Failed to connect to Hedera network. Please check your HEDERA_RPC_URL. Original error: ${error.message}`);
    }
    throw new Error(`Failed to mint attestation on Hedera: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function checkAttestation(walletAddress: string): Promise<{ hasAttestation: boolean; cid: string; isValid: boolean }> {
  const rpcUrl = process.env.HEDERA_RPC_URL;
  const contractAddress = process.env.HEDERA_CONTRACT_ADDRESS;

  if (!rpcUrl || !contractAddress) {
    // In development, if Hedera is not configured, return a safe fallback
    console.warn("Hedera not configured (HEDERA_RPC_URL/HEDERA_CONTRACT_ADDRESS). Returning fallback from checkAttestation.");
    return { hasAttestation: false, cid: "", isValid: false };
  }

  try {
    // Create provider (read-only) with explicit network configuration for Hedera
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl, {
      name: "hedera-testnet",
      chainId: 296, // Hedera testnet chain ID
    });
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

    // Call checkAttestation function
    const [hasAttestation, cid, isValid] = await contract.checkAttestation(walletAddress);
    
    return {
      hasAttestation,
      cid,
      isValid
    };
  } catch (error) {
    console.error("Hedera checkAttestation error:", error);
    // If it's a network error, provide more helpful message
    if (error instanceof Error && error.message.includes('could not detect network')) {
      throw new Error(`Failed to connect to Hedera network. Please check your HEDERA_RPC_URL. Original error: ${error.message}`);
    }
    throw new Error(`Failed to check attestation on Hedera: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
