
'use client'

import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter , Button, Input, useDisclosure} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";


import submitAction from '../lib/actions/actions'
import createNft from '../lib/scripts/safeMintAndSafeTransfer';



export default function ModalOem(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [state, action] = useFormState(submitAction, {message:"", uris:[]});
    const { pending } = useFormStatus();


    async function mintNft(){
      console.log("Estoy en mintNFT");
      if(state.uris[0] != null){
        try {
          console.log("Estoy en mintNFT2");
        
        console.log("Estoy en mintNFT3");
        await createNft(state.uris[0], state.uris[1], state.uris[2], state.uris[3]);
        console.log("conseguido final");
        
        state.message = "";
        state.uris = [];

        } catch (error) {
          console.log(" error minting Nft: " , error);
        }
      }else{
        console.log("There is no form submitted");
      }

    }

    useEffect(() => {
      mintNft();
    }, [state.message == "Car's NFT created successfully"]);

    

    
  
    return (
      <>
        <Button onPress={onOpen} color="secondary" variant="ghost" size="lg">MINT CAR NFT</Button>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
          scrollBehavior="outside"
          className="min-h-screen"
        >
          <ModalContent>
          
            {(onClose) => (
              <>
              <ModalBody className=" flex flex-col justify-center items-center">


              <form action={action} className=" w-full rounded px-8 pt-6 pb-8 mb-4">
  {state.message ? (
    <p className="text-green-300">{state.message}</p>
  ) : null}
  
  <div className="mb-4">
    <label htmlFor="name" className="block text-red-200 text-sm font-bold mb-2">Name</label> 
    <input 
      type="text" 
      id="name" 
      name="name" 
      autoFocus 
      placeholder="Enter the full name of the car with year" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="description" className="block text-red-200 text-sm font-bold mb-2">Description</label> 
    <input 
      type="text" 
      id="description" 
      name="description" 
      placeholder="Short description" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="vim" className="block text-red-200 text-sm font-bold mb-2">Vim</label> 
    <input 
      type="text" 
      id="vim" 
      name="vim" 
      placeholder="Car´s VIM" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="model" className="block text-red-200 text-sm font-bold mb-2">Model</label> 
    <input 
      type="text" 
      id="model" 
      name="model" 
      placeholder="Car´s Model" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="zylinder" className="block text-red-200 text-sm font-bold mb-2">Zylinder</label> 
    <input 
      type="text" 
      id="zylinder" 
      name="zylinder" 
      placeholder="Car´s zylinder" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="ps" className="block text-red-200 text-sm font-bold mb-2">Ps</label> 
    <input 
      type="text" 
      id="ps" 
      name="ps" 
      placeholder="Car´s Ps" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="speed" className="block text-red-200 text-sm font-bold mb-2">Speed 0-100</label> 
    <input 
      type="text" 
      id="speed" 
      name="speed" 
      placeholder="Car´s 0-100 speed" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="vmax" className="block text-red-200 text-sm font-bold mb-2">V-max</label> 
    <input 
      type="text" 
      id="vmax" 
      name="vmax" 
      placeholder="Max Speed of the car" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="color" className="block text-red-200 text-sm font-bold mb-2">Color</label> 
    <input 
      type="text" 
      id="color" 
      name="color" 
      placeholder="Car´s color" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="productionDate" className="block text-red-200 text-sm font-bold mb-2">Date of Production</label> 
    <input 
      type="text" 
      id="productionDate" 
      name="productionDate" 
      placeholder="Car´s date of production" 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-red-200 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  
  <button type="submit" className="bg-lila hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={pending}>Mint</button>
</form>


                </ModalBody>

              </>
            )}
            
          </ModalContent>
        </Modal>

        
      </>
      
    );
}