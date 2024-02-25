const ethers = require("ethers");
import { abi, abiTradify } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function getHistoryUri(_nftAddress, _tokenId) {
  console.log("We are in script getHistoryURI");

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
    console.log(_nftAddress);
    const bm3_3er = new ethers.Contract(_nftAddress, abi, signer);

    const tokenIdUint = parseInt(_tokenId, 10);
    console.log(tokenIdUint, _tokenId);
    const getUri = await bm3_3er.tokenURI(tokenIdUint);
    console.log("he pasado11");
    const getHistory = await bm3_3er.s_historyCar(tokenIdUint);
    console.log("he pasado111");
    // Wait for the first transaction

    try {
      const tokenURIResponse = await (await fetch(getUri)).json();
      console.log("he pasado2");
      const tokenHistoryOdoResponse = await (await fetch(getHistory[1])).json();
      console.log("he pasado3");
      const tokenHistoryRepairResponse = await (
        await fetch(getHistory[2])
      ).json();
      console.log("esto es :", tokenHistoryRepairResponse);

      // Access the image property from the parsed JSON object

      const imageUrl = tokenURIResponse.image;
      const name = tokenURIResponse.name;
      const model = tokenURIResponse.attributes[1].value;
      const odometer = tokenHistoryOdoResponse.odometer;
      const repairs =
        tokenHistoryRepairResponse.reparations[0].kindOfReparation;
      const repairsDate = tokenHistoryRepairResponse.reparations[0].repairDate;
      const obj = { name, model, imageUrl, odometer, repairs, repairsDate };
      console.log(obj); // This should log the image URL

      return obj;
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    }
  } catch (error) {
    console.error("Error creatung Listing:", error);
  }
}
