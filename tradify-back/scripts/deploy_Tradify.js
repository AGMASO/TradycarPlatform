const hre = require("hardhat");

async function main() {
  const signer0 = await hre.ethers.provider.getSigner(0);
  const signerAddress = await signer0.getAddress();

  // if you changed the name of the contract, be sure to update this here!
  const tradifyPlat = await hre.ethers.deployContract("TradifyPlatform", []);

  await tradifyPlat.waitForDeployment();

  console.log("Tradify Platform SM deployed to:", tradifyPlat.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
