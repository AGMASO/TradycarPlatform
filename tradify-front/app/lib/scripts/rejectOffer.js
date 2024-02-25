const ethers = require("ethers");
import { abi, abiTradify } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function rejectOffer(_nftAddress, _tokenId, _offerIndex) {
  console.log("We are in script rejectOffer");

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

    const addressContract = "<YOUR ADDRESS Tradify_Platform>";

    const tradify = new ethers.Contract(addressContract, abiTradify, signer);

    const tx = await tradify.rejectOffer(_nftAddress, _tokenId, _offerIndex);
    // Wait for the second
    await tx.wait();

    console.log("Offer is rejected");
  } catch (error) {
    console.error("Error rejecting Offer:", error);
  }
}
