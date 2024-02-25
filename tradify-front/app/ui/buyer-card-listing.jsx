import React from "react";
import { useState } from "react";
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

import createOffer from '../lib/scripts/createOffer';


export default function BuyerCardListing({id,
  key,
  seller,
  carListingIndex,
  nftAddress,
  price,
  tokenId , image ,
  name, model, odometer, repairs,
  repairsDate }) {


  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log(nftAddress,tokenId, formData.price);

       

      await createOffer(nftAddress, formData.price, tokenId, );

      console.log("Success to create Offer");
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Close the modal after submission
    setIsOpen(false);
  };
  const handleCloseModal = () => {
    // Reset the form data when the modal is closed
    setFormData({
     
      price: ""
    });
    setIsOpen(false);
  };

  return (
    <Card className="py-4 min-h-[70vh]" key={carListingIndex}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large">{name}</h4>
      <small className="text-default-500">{model}</small>
      <p className="text-tiny uppercase font-bold text-indigo-600 pt-[5px] text-end"><span className=" text-[8px]">Owned by  </span> { seller.slice(0,5) + "..." + seller.slice(-5)}</p>
      <p className="text-tiny uppercase font-bold text-indigo-600 pt-[5px] text-end text-[8px]">Token Id  {tokenId}</p>

      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />

        <div className="flex flex-col justify-center align-middle text-center p-[10px]">
      <small className="text-default-500 pt-3">Odometer ---- {odometer} Km</small>
      <small className="text-default-500">Repairs ---- {repairs}</small>
      <small className="text-default-500">Repairs Date ---- {repairsDate}</small>
      <h4 className="font-bold text-large p-2 text-indigo-600">{price} SepoliaETH</h4>
      
        </div>
      <Button onPress={() => setIsOpen(true)} color="secondary" variant="ghost">Bid on Car</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={handleCloseModal}
        placement="top-center"
      >
        <ModalContent>
          
            
            <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1 text-blue-600">Bid on the Car</ModalHeader>
              <ModalBody>
              <Input
                label="Price"
                placeholder="Enter the desired price for sell"
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                variant="bordered"
                className=" text-indigo-600"
              />
                
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    I commit to paying the offered amount if the seller accepts my offer
                  </Checkbox>
                  
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleCloseModal}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Create Offer
                </Button>
              </ModalFooter>
              </form>
            </>
          
          
        </ModalContent>
      </Modal>

      </CardBody>
      
    </Card>
  );
}
