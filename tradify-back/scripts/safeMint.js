const hre = require("hardhat");

async function main() {
  const signer0 = await hre.ethers.provider.getSigner(0);
  const signerAddress = await signer0.getAddress();
  const bmw_3er = await hre.ethers.getContractAt(
    "Bmw_3er",
    "0x0708fD4B4896354d312b3C28D90dFc4B2A090C2d",
    signer0
  );

  await bmw_3er.safeMint(
    signerAddress,
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmYTMNzTb3Muzv53MjrXA3A7hHyavgHbPwrCQCoXb44g9C",
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/Qmck8aEGCCfB1RD3r6oCJoZJrFuUZv2UJJ5H9UgRFf5SX6",
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmW6qoMFY9eBjm8cBpAKVqGCj3j7MZ7iZCgGAPSMJKiyqY",
    "https://pink-payable-coral-131.mypinata.cloud/ipfs/QmWmcWsF6ZKTbhdg2C6gKj5uzcGXH7NUTbmkhnTxLxHEVx"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
