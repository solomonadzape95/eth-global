import { ethers } from "hardhat";

async function main() {
  console.log("Deploying MyAttestation contract to local Hardhat network...");

  const MyAttestation = await ethers.getContractFactory("MyAttestation");
  const attestation = await MyAttestation.deploy();

  await attestation.waitForDeployment();

  const address = await attestation.getAddress();
  console.log("MyAttestation deployed to:", address);
  console.log("Contract owner:", await attestation.owner());
  
  // Save the contract address and ABI for backend use
  console.log("\n=== DEPLOYMENT INFO ===");
  console.log("Contract Address:", address);
  console.log("Network: Local Hardhat");
  console.log("Chain ID: 31337");
  console.log("\nFor testing, add this to your backend .env:");
  console.log(`HEDERA_CONTRACT_ADDRESS=${address}`);
  console.log(`HEDERA_RPC_URL=http://localhost:8545`);
  console.log(`HEDERA_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`);
  
  console.log("\nTo deploy to Hedera Testnet:");
  console.log("1. Get testnet HBAR from https://portal.hedera.com/");
  console.log("2. Set HEDERA_PRIVATE_KEY in .env");
  console.log("3. Run: npx hardhat run scripts/deploy.ts --network hedera_testnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
