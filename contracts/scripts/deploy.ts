import { ethers } from "hardhat";

async function main() {
  console.log("Deploying MyAttestation contract...");

  const MyAttestation = await ethers.getContractFactory("MyAttestation");
  const attestation = await MyAttestation.deploy();

  await attestation.waitForDeployment();

  const address = await attestation.getAddress();
  console.log("MyAttestation deployed to:", address);
  console.log("Contract owner:", await attestation.owner());
  
  // Save the contract address and ABI for backend use
  console.log("\n=== DEPLOYMENT INFO ===");
  console.log("Contract Address:", address);
  console.log("Network: Hedera Testnet");
  console.log("Chain ID: 296");
  console.log("\nAdd this to your backend .env:");
  console.log(`HEDERA_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
