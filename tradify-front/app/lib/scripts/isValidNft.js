const ethers = require("ethers");
import { abi } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function checkIsValidNft(nftAddress, tokenId) {
  console.log("estoy aqui");

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

  const addressContract = nftAddress;

  const bmw_3er = new ethers.Contract(addressContract, abi, signer);

  try {
    const tx = await bmw_3er.ownerOf(tokenId);
    console.log("Valido valido", tx);
    return "Valid Nft";
  } catch (error) {
    console.log("No valid Nft");
    return "No Valid Nft";
  }
}
