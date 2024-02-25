'use client'

import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react'; // Import useEffect and useState
import { ethers } from 'ethers';

import getHistoryUri from '../../lib/scripts/getHistoryUri'

import CodersComp from "../../ui/coderscomp";
import MenuMain from "../../ui/menu-main";
import GET_ACTIVE_LISTINGS_FILTERED from '../../lib/apollo-queries/listingsFiltered';
import { useAccount } from "wagmi";
import SellerCardListingOffer from "../../ui/seller-card-listing-for-offers";
import Loading from '../../ui/loading'



export default function ListingSeller(){
    const {address} = useAccount();
    console.log(address);
    const { loading, error, data } = useQuery(GET_ACTIVE_LISTINGS_FILTERED ,{
      variables: { seller: address}
    });
    const [historyUris, setHistoryUris] = useState({});

    useEffect(() => {
        const fetchHistoryUris = async () => {
            if (data && data.activeNewListings) {
                const uris = {};
                for (const listing of data.activeNewListings) {
                    const { nftAddress, tokenId } = listing;
                    const objData = await getHistoryUri(nftAddress, tokenId);
                    uris[tokenId] = objData;
                }
                setHistoryUris(uris);
            }
        };
        fetchHistoryUris();
    }, [data]);
    return (
        <div className="flex flex-col min-h-screen bg-gray-900">  
            <MenuMain></MenuMain>
            <div className="flex flex-col flex-grow justify-between">
                <div className=" min-h-20" ></div>
                <div className="flex flex-row justify-center items-center gap-5 p-6" >
                {loading && <Loading></Loading>}
                {!loading && !data && <p className=" text-red-500"> No Listings Opened</p>}
                {error && <p className=" text-red-500"> No Listings Opened</p>}
                {data && data.activeNewListings.map((listing)=>{
                        console.log(listing.attributes);
                        const {id,
                            seller,
                            carListingIndex,
                            nftAddress,
                            tokenId,
                            price} = listing;
                        const image = historyUris[tokenId]?.imageUrl;
                        const name = historyUris[tokenId]?.name;
                        const model = historyUris[tokenId]?.model;
                        const odometer = historyUris[tokenId]?.odometer;
                        const repairs = historyUris[tokenId]?.repairs;
                        const repairsDate = historyUris[tokenId]?.repairsDate;
                        const priceEth = ethers.utils.formatEther(price);
                        return(
                            <SellerCardListingOffer 
                                key={id}
                                seller={seller}
                                price={priceEth}
                                carListingIndex={carListingIndex}
                                nftAddress={nftAddress}
                                tokenId={tokenId} id={undefined} image={image}  
                                name={name} model={model} odometer={odometer} repairs={repairs}
                                repairsDate={repairsDate} 
                                ></SellerCardListingOffer>
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

