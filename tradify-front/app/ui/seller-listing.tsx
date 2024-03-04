import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

import createListing from "../lib/scripts/createListing";

export default function SellerListing() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nftAddress: "",
    tokenId: "",
    price: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(formData.nftAddress, formData.price, formData.tokenId);

      await createListing(
        formData.nftAddress,
        formData.tokenId,
        formData.price
      );

      console.log("Success to create Listing");
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Close the modal after submission
    setIsOpen(false);
  };
  const handleCloseModal = () => {
    // Reset the form data when the modal is closed
    setFormData({
      nftAddress: "",
      tokenId: "",
      price: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)} color='secondary' variant='ghost'>
        Create Listing
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} placement='top-center'>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label='Nft Address'
                type='text'
                id='nftAddress'
                name='nftAddress'
                placeholder='Enter the address of your NFT'
                variant='bordered'
                value={formData.nftAddress}
                onChange={handleChange}
                className=' text-indigo-600'
              />
              <Input
                label='Token Id'
                placeholder='Enter the token Id of your NFT'
                type='text'
                id='tokenId'
                name='tokenId'
                value={formData.tokenId}
                onChange={handleChange}
                variant='bordered'
                className=' text-indigo-600'
              />
              <Input
                label='Price'
                placeholder='Enter the desired price for sell'
                type='text'
                id='price'
                name='price'
                value={formData.price}
                onChange={handleChange}
                variant='bordered'
                className=' text-indigo-600'
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onClick={handleCloseModal}>
                Close
              </Button>
              <Button type='submit' color='primary'>
                Create Listing
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
