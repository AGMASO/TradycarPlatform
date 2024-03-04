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
import { useEffect } from "react";

import submitActionAllow from "../lib/actions/submitActionAllow";
import allowReapairShops from "../lib/scripts/allowRepairShops";

export default function ModalAllowRepairShop() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [state, action] = useFormState(submitActionAllow, {
    message: "",
    arrayOfAddresses: [],
  });
  const { pending } = useFormStatus();

  async function allowingRepairShops() {
    console.log("Estoy en allowRepairShops");
    if (state.arrayOfAddresses[0] != null) {
      try {
        console.log("Estoy en allowRepairShops2");

        console.log("Estoy en mintNFT3");
        await allowReapairShops(state.arrayOfAddresses);
        console.log("conseguido final");

        state.message = "";
        state.arrayOfAddresses = [];
      } catch (error) {
        console.log(" error minting Nft: ", error);
      }
    } else {
      console.log("There is no form submitted");
      state.message = "";
      state.arrayOfAddresses = [];
    }
  }

  useEffect(() => {
    allowingRepairShops();
  }, [state.message == "Repair Shops added correctly"]);

  return (
    <>
      <Button onPress={onOpen} color='secondary' variant='ghost' size='lg'>
        Add Allowed Repair Shops
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        scrollBehavior='outside'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className=' min-h-[300px] flex flex-col justify-center items-center'>
                <form
                  action={action}
                  className='w-full rounded px-8 pt-6 pb-8 mb-4'
                >
                  {state.message ? (
                    <p className='text-green-300'>{state.message}</p>
                  ) : null}
                  <div className='mb-4'>
                    <label
                      htmlFor='address1'
                      className='block text-red-200 text-sm font-bold mb-2'
                    >
                      Address 1
                    </label>
                    <input
                      type='text'
                      id='address1'
                      name='address1'
                      autoFocus
                      placeholder='Enter the address'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='address2'
                      className='block text-red-200 text-sm font-bold mb-2'
                    >
                      Address 2
                    </label>
                    <input
                      type='text'
                      id='address2'
                      name='address2'
                      placeholder='Enter the address'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='address3'
                      className='block text-red-200 text-sm font-bold mb-2'
                    >
                      Address 3
                    </label>
                    <input
                      type='text'
                      id='address3'
                      name='address3'
                      placeholder='Enter the address'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='address4'
                      className='block text-red-200 text-sm font-bold mb-2'
                    >
                      Address 4
                    </label>
                    <input
                      type='text'
                      id='address4'
                      name='address4'
                      placeholder='Enter the address'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                  <button
                    type='submit'
                    className='bg-lila hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    disabled={pending}
                  >
                    Allow new Repair Shops
                  </button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
