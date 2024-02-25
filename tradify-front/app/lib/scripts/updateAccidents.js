const ethers = require("ethers");
import { abi } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function updateAccidents(
  _tokenId,
  _accidentUri,
  addressContractNft
) {
  console.log("We are in script updateAccident");

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

    const addressContract = addressContractNft;

    console.log("esto es addressContract: ", addressContract);

    const bmw_3er = new ethers.Contract(addressContract, abi, signer);

    const tx = await bmw_3er.updateAccidentsTracking(_tokenId, _accidentUri);

    // Wait for the first transaction (minting) to be confirmed
    await tx.wait();

    console.log("success to update the Accidents tracking");
  } catch (error) {
    console.error("Error updating Accidents:", error);
  }
}
