const ethers = require("ethers");
import { abi } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

const FirstOwnerOfTheCar = "0xEeCdf10373bdEee9C66150443b63C15B297D6000";
let tokenId;

export default async function createNft(
  uri,
  odometerUri,
  repairUri,
  accidentUri
) {
  console.log("estoy aqui");

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Request access to the MetaMask account
    await window.ethereum.send("eth_requestAccounts");
    // Get the signer's address
    const signerAddress = (await provider.listAccounts())[0];
    console.log(signerAddress);

    // Create an instance of the signer using the provider and signer's address
    const signer = provider.getSigner(signerAddress);
    console.log(signer);

    console.log("estoy trabajando");

    const addressContract = "<YOUR ADDRESS Tradify_NFT>";

    const bmw_3er = new ethers.Contract(addressContract, abi, signer);

    const tx = await bmw_3er.safeMint(
      signerAddress,
      uri,
      odometerUri,
      repairUri,
      accidentUri
    );

    // Wait for the first transaction (minting) to be confirmed
    const txReciept = await tx.wait(1);

    txReciept.events.forEach((event) => {
      if (event.event == "Transfer") {
        console.log("Esto es el TokenID", event.args.tokenId);
        tokenId = event.args.tokenId;
      }
    });

    console.log("success to mint");
    console.log("Esto sigue siendo tokenId", tokenId);

    const tx2 = await bmw_3er.safeTransferFromAndHistory(
      signerAddress,
      FirstOwnerOfTheCar,
      tokenId
    );

    console.log("success to send to the firstOwner");
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}
