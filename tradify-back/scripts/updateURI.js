const hre = require("hardhat");

async function main() {
  const signer0 = await hre.ethers.provider.getSigner(0);
  const signerAddress = await signer0.getAddress();

  // if you changed the name of the contract, be sure to update this here!
  const bmw_3er = await hre.ethers.getContractAt(
    "Bmw_3er",
    "0x90b04616a1F2688dB0409C93aBd83274C4e4AA8c",
    signer0
  );

  await bmw_3er.updateNft(
    0,
    "https://ipfs.io/ipfs/QmTAq9bWFBDiH7Mn7iFg4tfkqXehcoHuN7h8xnCpUZs9Ct"
  );
  console.log("Updated");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
