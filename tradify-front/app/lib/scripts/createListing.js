const ethers = require("ethers");
import { abi, abiTradify } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function createListing(_nftAddress, _tokenId, _price) {
  console.log("We are in script createLisitng");

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

    const bm3_3er = new ethers.Contract(_nftAddress, abi, signer);
    const tradify = new ethers.Contract(addressContract, abiTradify, signer);

    const tokenIdUint = parseInt(_tokenId, 10);
    // Convert the value to the appropriate format for Ethereum (wei)
    const priceInWei = ethers.utils.parseEther(_price);
    console.log(priceInWei);

    const approveTx = await bm3_3er.approve(addressContract, tokenIdUint);
    // Wait for the first transaction
    await approveTx.wait();

    const tx = await tradify.listCar(_nftAddress, priceInWei, _tokenId);
    // Wait for the second
    await tx.wait();

    console.log("success to create your Listing");
  } catch (error) {
    console.error("Error creatung Listing:", error);
  }
}
