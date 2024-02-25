
'use client'
import { useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { useAccount } from "wagmi";


import GET_APPROVED_OFFER_FOR_PAY from '../lib/apollo-queries/offer-accepted-pay';
import CodersComp from "@/app/ui/coderscomp";
import MenuMain from "@/app/ui/menu-main";
import BuyerOfferCardAccepted from '../ui/buyer-offer-accepted-pay';
import Loading from "../ui/loading";




export default function Offers(){

    const {address} = useAccount();

  
    const{loading, error, data} = useQuery(GET_APPROVED_OFFER_FOR_PAY,{
        variables:{buyer: address,},
    });
    


    return (
        <div className="flex flex-col min-h-screen bg-gray-900">  
            <MenuMain></MenuMain>
            <div className="flex flex-col flex-grow justify-between">
                <div className=" min-h-20" ></div>
                <div className="flex flex-row justify-center items-center gap-10 p-6" >
                {loading && <Loading></Loading>}
                {!loading && !data && <p className=" text-red-500"> No Offers Opened</p>}
                {data && data.activeNewOffers.map((offer)=>{
                       
                        const {id,
                            buyer,
                            price,
                        offerIndex ,
                        nftAddress,
                        nftTokenId
                        } = offer;
                            const priceEth = ethers.utils.formatEther(price);
                            console.log("esto es offerindex", offerIndex);
                            console.log("esto es nftAddress", nftAddress, nftTokenId);
                            
                       
                        return(
                            
                            <BuyerOfferCardAccepted 
                            key={undefined}
                                id={id}
                                price={priceEth}
                                buyer={buyer}
                                offerIndex={offerIndex}
                                nftAddress={nftAddress}
                                tokenId={nftTokenId}
                                ></BuyerOfferCardAccepted>
                            
                        )
                        
                    })

                }

                </div>

                <div className=" mt-auto">
                <CodersComp></CodersComp>
                </div>
                


            </div>
        </div>
    );
}