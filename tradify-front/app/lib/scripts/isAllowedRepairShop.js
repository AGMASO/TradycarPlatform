const ethers = require("ethers");
import { sign } from "crypto";
import { abi } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function isAllowedRepairShop() {
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

    const arrayRepairShops = await bmw_3er.getRepairShopsAllowed();

    console.log(arrayRepairShops);

    for (let i = 0; i < arrayRepairShops.length; i++) {
      console.log(arrayRepairShops[i]);

      if (arrayRepairShops[i] === signerAddress) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error executing the isAllowedReapirShop: ", error);
  }
}
