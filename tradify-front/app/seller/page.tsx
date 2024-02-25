'use client'
import MenuMain from "../ui/menu-main";

import CodersComp from "../ui/coderscomp";
import SellerListing from "../ui/seller-listing"
import { Button } from "@nextui-org/react";
import Link from "next/link";


export default function Seller(){
    return (
        <div className="flex flex-col min-h-full">  
            <MenuMain></MenuMain>
            <div className="flex flex-col h-[10vh] min-h-screen justify-between">
                <div className=" min-h-20" ></div>
                <div className="flex flex-row">
                    <div className="flex flex-col justify-start items-center gap-5 p-6  min-h-[60vh] w-[50%]" >
                    <p className="line w-[100%] md:w-[50%] text-xl text-white font-bold text-center">
                    Do you want to sell your car without risks?
                    </p>
                    
                    <SellerListing></SellerListing>

                    </div>

                    <div className="flex flex-col justify-start items-center gap-5 p-6 min-h-[60vh] w-[50%]" >
                        <p className="line w-[100%] md:w-[50%] text-xl text-white font-bold text-center">
                        Check If someone made an offer for your Car
                        </p>
                        
                        <Button as={Link} color="secondary" variant="ghost" href={"/seller/listings-seller"}>Go to Offers</Button>
                    </div>
                </div>

            

                <div className=" bottom-0">
                <CodersComp></CodersComp>
                </div>
                


            </div>
        </div>
    );
}