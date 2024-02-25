const ethers = require("ethers");
import { abi } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function allowRepairShops(array) {
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

    const validAddresses = array.filter((address) => address !== "");
    const tx = await bmw_3er.approveRepairShops(validAddresses);

    console.log("success to add repairShops");
  } catch (error) {
    console.error("Error adding ReapierShops:", error);
  }
}
