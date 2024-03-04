"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import repairShopSubmitAction from "../lib/actions/repairShopSubmitAction";
import RepairUpdateNft from "../ui/repairshop-update-nft";
import checkIsValidNft from "../lib/scripts/isValidNft";
import isAllowedRepairShop from "../lib/scripts/isAllowedRepairShop";

export default function RepairShopCheckNft() {
  const [isInvalidRepairShop, setIsInvalidRepairShop] = useState("");
  const [formData, setFormData] = useState({
    nftAddress: "",
    tokenId: "",
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
      const isValidShop = await isAllowedRepairShop();
      await console.log(isValidShop);
      const message = isValidShop
        ? "Authorized RepairShop"
        : "Not authorized RepairShop";
      setIsInvalidRepairShop(message);
      console.log(isInvalidRepairShop);
    } catch (error) {
      console.error("Error checking repair shop:", error);
      setIsInvalidRepairShop("Error checking repair shop");
    }
  };

  return (
    <div className=''>
      {!isInvalidRepairShop ? (
        <>
          <div className='flex mb-[30px]'>
            <p className=' text-xl'>Which NFT would you like to update?</p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            >
              {isInvalidRepairShop === "Not authorized RepairShop" && (
                <p className='text-red-500'>
                  You are not an Allowed Repair Shop
                </p>
              )}
              <div className='mb-4'>
                <label
                  htmlFor='nftAddress'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  NFT Address
                </label>
                <input
                  type='text'
                  id='nftAddress'
                  name='nftAddress'
                  value={formData.nftAddress}
                  onChange={handleChange}
                  required
                  placeholder='Enter the NFT Address associated with the car you want to update'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ></input>
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='tokenId'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Token Id
                </label>
                <input
                  type='text'
                  id='tokenId'
                  name='tokenId'
                  value={formData.tokenId}
                  onChange={handleChange}
                  required
                  placeholder='Enter the Token Id'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ></input>
              </div>
              <div className='flex items-center justify-center'>
                <button
                  type='submit'
                  className='bg-lila hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <RepairUpdateNft
          status={isInvalidRepairShop}
          addressContractNft={formData.nftAddress}
          tokenId={formData.tokenId}
        />
      )}
    </div>
  );
}
