import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";

import paymentToEscrow from "../lib/scripts/paymentToEscrow";

export default function BuyerOfferCardAccepted({
  id,
  price,
  buyer,
  offerIndex,
  nftAddress,
  tokenId,
}) {
  const handlePayment = async () => {
    try {
      await paymentToEscrow(nftAddress, tokenId, price);

      alert("We made it");
      console.log("We made it");
    } catch (error) {
      console.error("Error Paying offer:", error);
    }
  };

  return (
    <Card className='py-4 min-h-[30vh] w-[20vw]' key={id}>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
        <h4 className='font-bold text-medium'>Seller has accepted your Bid</h4>
        <small className='text-default-500 mt-[20px]'>
          Price you need to pay
        </small>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <div className='flex flex-col justify-center align-middle text-center p-[10px]'>
          <h4 className='font-bold text-large p-2 text-indigo-600'>
            {price} SepoliaETH
          </h4>
        </div>
      </CardBody>
      <CardFooter className='flex flex-row justify-evenly align-middle'>
        <Button color='secondary' variant='ghost' onClick={handlePayment}>
          Process to pay
        </Button>
      </CardFooter>
    </Card>
  );
}
