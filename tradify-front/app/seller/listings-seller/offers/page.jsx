
'use client'
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";



import GET_ACTIVE_OFFERS from '../../../lib/apollo-queries/offers';
import CodersComp from "@/app/ui/coderscomp";
import MenuMain from "@/app/ui/menu-main";
import SellerOffersCard from '../../../ui/seller-offers-card';
import Loading from "../../../ui/loading";




export default function Offers(){

    const searchParams = useSearchParams();

    const nftAddress = searchParams.get('nftAddress');
    const _nftTokenId = searchParams.get('tokenId');

  
    const{loading, error, data} = useQuery(GET_ACTIVE_OFFERS,{
        variables:{nftAddress: nftAddress,
                _nftTokenId: _nftTokenId},
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
                        offerIndex } = offer;
                            const priceEth = ethers.utils.formatEther(price);
                            console.log("esto es offerindex", offerIndex);
                            console.log("esto es id", _nftTokenId);
                            console.log("esto es address", nftAddress);
                       
                        return(
                            
                            <SellerOffersCard 
                            key={undefined}
                                id={id}
                                price={priceEth}
                                buyer={buyer}
                                offerIndex={offerIndex}
                                nftAddress={nftAddress}
                                tokenId={_nftTokenId}
                                ></SellerOffersCard>
                            
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