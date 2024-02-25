
'use client'

import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter , Button, Input, useDisclosure} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";


import actionUpdateAccidents from '../lib/actions/actionUpdateAccidents';
import actionUpdateOdo from '../lib/actions/actionUpdateOdo';
import actionUpdateRepairLog from '../lib/actions/actionUpdateReapirLog';
import updateAccidents from '../lib/scripts/updateAccidents';
import updateRepair from '../lib/scripts/updateRepair';
import updateOdometer from '../lib/scripts/updateOdometer';


export default function RepairUpdateNft({status,tokenId, addressContractNft}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [stateOdo, actionOdo] = useFormState(actionUpdateOdo, {message:"", odoUri:""});
    const [stateRepairLog, actionRepairLog] = useFormState(actionUpdateRepairLog, {message:"", repairUri:""});
    const [stateAccidents, actionAccidents] = useFormState(actionUpdateAccidents, {message:"",accidentUri :""});
    const { pending } = useFormStatus();

    async function odoUpdate(){
        console.log("Estoy en odoUpdate");
        if(stateOdo.odoUri != ""){
          try {
            console.log("Estoy en odoUpdate2");
          
          
          await updateOdometer(tokenId, stateOdo.odoUri,addressContractNft);
          console.log("conseguido final");
          
          stateOdo.message = "";
          stateOdo.odoUri = "";
  
          } catch (error) {
            console.log("error updating odometer info: " , error);
          }
        }else{
          console.log("There is no form submitted");
        }
  
      }
  
      useEffect(() => {
        odoUpdate();
      }, [stateOdo.message == "Updated Odometer Information done"]);

      async function acciUpdate(){
        console.log("Estoy en acciUpdate");
        if(stateAccidents.accidentUri != ""){
          try {
            console.log("Estoy en acciUpdate2");
          
          
          await updateAccidents(tokenId,stateAccidents.accidentUri ,addressContractNft);
          console.log("conseguido final");
          
          stateAccidents.message = "";
          stateAccidents.accidentUri = "";
  
          } catch (error) {
            console.log("error updating accidents info: " , error);
          }
        }else{
          console.log("There is no form submitted");
        }
  
      }

      useEffect(() => {
        acciUpdate();
      }, [stateAccidents.message == "Updated Accidents tracking Information done"]);


      async function reapirUpdate(){
        console.log("Estoy en repairUpdate");
        if(stateRepairLog.repairUri != ""){
          try {
            console.log("Estoy en repairUpdate2");
          
          
          await updateRepair(tokenId,stateRepairLog.repairUri ,addressContractNft);
          console.log("conseguido final");
          
          stateRepairLog.message = "";
          stateRepairLog.repairUri = "";
  
          } catch (error) {
            console.log("error updating Repair Log info: " , error);
          }
        }else{
          console.log("There is no form submitted");
        }
  
      }

      useEffect(() => {
        reapirUpdate();
      }, [stateRepairLog.message == "Updated Repair Log done"]);

    return (
      <>
      <div className=" flex flex-col min-h-[100vh] justify-center items-center gap-9">
        <div className=" flex flex-col justify-center items-center ">

            <p className=" text-xl">Introduce the required data to update each section</p>
            {status === "Authorized RepairShop" && (
                    <p className=" text-green-500 text-xs">You are an Allowed Repair Shop</p>
                  )}
        </div>

        <div className=" flex flex-row gap-5 justify-center items-center">

            <div className=" w-[100%] p-5">

                <form action={actionOdo} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Odometer Value</label> 
                        <input 
                        type="text"
                        id="odoValue" 
                        name="odoValue" 
                        autoFocus 
                        placeholder="Enter the updated value of the Odometer" 
                        
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></input>

                  </div>
                  <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Observations</label> 
                        <input 
                        type="text" 
                        id="observations" 
                        name="observations" 
                        autoFocus 
                        placeholder="Something important to comment on?" 
                        
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></input>
                  </div>  
                        
                        <button type="submit" className="bg-lila hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={pending}>Enter</button>
                </form>
    
            </div>
            <div className="w-[100%] p-5">
    <form action={actionRepairLog} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Kind of Repair done</label> 
            <input 
                type="text" 
                id="repairKind" 
                name="repairKind" 
                autoFocus 
                placeholder="Enter the kind of repair" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Observations</label> 
            <input 
                type="text" 
                id="repairObservations" 
                name="repairObservations" 
                autoFocus 
                placeholder="Add any observations" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        
        <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Date of Repair</label> 
            <input 
                type="text" 
                id="repairDate" 
                name="repairDate" 
                autoFocus 
                placeholder="Add the Date of Repair" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <button type="submit" className="bg-lila hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={pending}>Enter</button>
    </form>
</div>

<div className="w-[100%] p-5">
    <form action={actionAccidents} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Type of Accident</label> 
            <input 
                type="text" 
                id="acciType" 
                name="acciType" 
                autoFocus 
                placeholder="Kind of accident" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Observations</label> 
            <input 
                type="text" 
                id="observations" 
                name="observations" 
                autoFocus 
                placeholder="Enter any observation" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Parts Damaged</label> 
            <input 
                type="text" 
                id="affectedParts" 
                name="affectedParts" 
                autoFocus 
                placeholder="Describe which parts are affected" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <button type="submit" className="bg-lila hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={pending}>Enter</button>
    </form>
</div>

        </div>
      </div>

      </>
      
    );
}