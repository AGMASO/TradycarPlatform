'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import Link from 'next/link';
import Image from 'next/image';
import MenuMain from './ui/menu-main';
import { Button } from '@nextui-org/react';

import HeroComponent from './ui/herocomponent';
import ExplanationComp from './ui/explanationcomponent';
import CodersComp from './ui/coderscomp';
import MenuNotConnected from './ui/menu-notConnected';


export default function Home() {

  const { address, isConnected, isDisconnected } = useAccount();
  return (
    <div className="min-h-screen">
      {isDisconnected && <MenuNotConnected></MenuNotConnected>}
      {isConnected && <MenuMain></MenuMain>} 
      <main className="flex-col justify-center">
        <div className="flex justify-center mb-[70px]">
          {isConnected ? (
            <div className="flex flex-col w-[100%]">
            
            
              <div className="flex justify-center items-center mb-20 mt-20">
                <p className="line text-2xl text-white font-bold">
                  Who are you?
                </p>
                
              </div>
              
              <div className="flex flex-col align-middle justify-center items-center gap-6">
              {address == "0x4C65cED1a185Ff79313F00A9C9D3f52D0dC7c4B2" ? (

                          <Button color="secondary" variant="ghost" size='lg' href="/oem"
                          as={Link}>
                          OEM
                          </Button>  

                          ) : ("")}
                
                  
                <Button color="secondary" variant="ghost" size='lg' href="/seller"
                    as={Link}>
                  Seller
                </Button>  
                
                
                <Button color="secondary" variant="ghost" size='lg' href="/buyer"
                    as={Link}>
                  Tradify Platform
                </Button>    
                
                
                <Button color="secondary" variant="ghost" size='lg' href="/repairshop"
                    as={Link}>
                  Repair Shop
                </Button>   
                
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              
              
              <div className="w-[100%]">
                <div className="w-[360px] sm:w-[1000px]">
                  <HeroComponent></HeroComponent>
                </div>
              </div>

              <div className="w-[100%]">
                <div className="w-[360px] sm:w-[1000px]">
                  <ExplanationComp></ExplanationComp>
                </div>
              </div>

            </div>
          )}
        </div>
        <div className="w-[100%] h-36 bottom-0">
          <div className="sm:w-[100%] h-full">
            <CodersComp></CodersComp>
          </div>
        </div>
      </main>
    </div>
  );
  
}