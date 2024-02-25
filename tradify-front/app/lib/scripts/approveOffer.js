const ethers = require("ethers");
import { abi, abiTradify, abiEscrow } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function approveOffer(_nftAddress, _tokenId, _offerIndex) {
  console.log("We are in script approveOffer");

  let newEscrow;

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
    const bmw_3er = new ethers.Contract(_nftAddress, abi, signer);
    console.log(_nftAddress, _tokenId, _offerIndex);
    const tx = await tradify.acceptOffer(_nftAddress, _tokenId, _offerIndex);
    // Wait for the second
    const txResponse = await tx.wait(1);

    console.log("estoy aqui");

    txResponse.events.forEach((event) => {
      if (event.event == "NewEscrowCreated") {
        console.log("esto es la address del newEscrow", event.args.newEscrow);
        newEscrow = event.args.newEscrow;
      }
    });

    const tx2 = await bmw_3er.approve(newEscrow, _tokenId);
    await tx2.wait();

    console.log("aprobado para el escrow");

    const escrow = new ethers.Contract(newEscrow, abiEscrow, signer);

    const tx3 = await escrow.sendNft();
    await tx3.wait();

    console.log("El nft debe estar a nombre de EscrowContract");
  } catch (error) {
    console.error("Error accepting Offer:", error);
  }
}
