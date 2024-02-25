const hre = require("hardhat");

async function main() {
  const signer0 = await hre.ethers.provider.getSigner(0);
  const signerAddress = await signer0.getAddress();

  // if you changed the name of the contract, be sure to update this here!
  const bmw_3er = await hre.ethers.deployContract("Bmw_3er", []);

  await bmw_3er.waitForDeployment();

  console.log("NFT SM deployed to:", bmw_3er.target);

  // update the IPFS CID to be your metadata CID
  /*await bmw_3er.safeMint(
    signerAddress,
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmYTMNzTb3Muzv53MjrXA3A7hHyavgHbPwrCQCoXb44g9C",
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/Qmck8aEGCCfB1RD3r6oCJoZJrFuUZv2UJJ5H9UgRFf5SX6",
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmW6qoMFY9eBjm8cBpAKVqGCj3j7MZ7iZCgGAPSMJKiyqY",
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmWmcWsF6ZKTbhdg2C6gKj5uzcGXH7NUTbmkhnTxLxHEVx"
  );
*/
  console.log("NFT Minted!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
