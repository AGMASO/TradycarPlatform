import React from "react";
import {Card, CardHeader, CardBody, Image, CardFooter, Button} from "@nextui-org/react";

import rejectOffer from "../lib/scripts/rejectOffer";
import approveOffer from "../lib/scripts/approveOffer";

export default function SellerOffersCard({id, buyer, price, nftAddress, tokenId,offerIndex }) {

  const handleReject = async () => {
    
    try {

      console.log(nftAddress, tokenId, offerIndex);
       await rejectOffer(nftAddress, tokenId, offerIndex);
      
       console.log("The offer is rejected");
      
    } catch (error) {
      console.error("Error rejecting:", error);
    }

  };

  const handleApprove = async () => {
    
    try {
      const zero = 0
      await approveOffer(nftAddress, tokenId, zero);

    } catch (error) {
      console.error("Error approving offer:", error);
    }

  };
 
  return (
    <Card className="py-4 min-h-[30vh] w-[20vw]" key={id}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
      <h4 className="font-bold text-medium">Buyer with Address: { buyer.slice(0,5) + "..." + buyer.slice(-5)}</h4>
      <small className="text-default-500 mt-[20px]">Is offering...</small>
    
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={""}
          width={270}
        />

        <div className="flex flex-col justify-center align-middle text-center p-[10px]">
      
      <h4 className="font-bold text-large p-2 text-indigo-600">{price} SepoliaETH</h4>
      
        </div>

      </CardBody>
      <CardFooter className="flex flex-row justify-evenly align-middle">
        
            <Button color="danger" variant="ghost" onClick={handleReject} >Reject</Button>

            <Button color="secondary" variant="ghost" onClick={handleApprove}>Accept Offer</Button>

      </CardFooter>
      
    </Card>
  );
}
