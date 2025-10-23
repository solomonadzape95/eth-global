const hre = require("hardhat");

async function main() {
  console.log("Deploying IdentityRegistry contract...");

  const registry = await hre.ethers.deployContract("IdentityRegistry");

  await registry.waitForDeployment();

  console.log(`IdentityRegistry deployed to: ${registry.target}`);
  // On Base Goerli, you can view this on:
  // https://goerli.basescan.org/address/YOUR_ADDRESS
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
