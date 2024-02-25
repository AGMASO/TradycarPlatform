"use server";

export default async function repairShopsubmitAction(prevState, data) {
  console.log(data);

  const nftAddress = data.get("nftAddress");
  const tokenId = data.get("tokenId");

  console.log("prevState:", prevState);

  console.log("etos son nftAddress y tokenId: ", nftAddress, tokenId);

  return {
    message: "Nft correcto",
  };
}
