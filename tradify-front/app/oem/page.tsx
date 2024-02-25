import MenuMain from "../ui/menu-main";
import CodersComp from "../ui/coderscomp";
import ModalOem from "../ui/modal-oem";
import ModalAllowRepairShop from '../ui/modal-allow-repairShop'

export default async function oem(){

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">  
            <MenuMain></MenuMain>
            <div className="flex flex-col flex-grow justify-between">
                <div className=" min-h-20" ></div>
                <div className="flex flex-col justify-start items-center gap-5 p-6 flex-grow">
                    <p className="line w-[100%] md:w-[50%] text-xl text-white font-bold text-center">
                      Only the OEM wallet is allowed to mint new Nfts of cars produced.
                    </p>
                    
                    <p className="line w-[100%] md:w-[50%] text-xl text-white font-bold text-center">
                        After a new car is produced, the OEM will mint a new NFT providing the main data of the car( Model, Color, VIM, PS ....)
                    </p>
                    <p className="line w-[100%] md:w-[50%] text-xl text-white font-bold text-center">
                        In this example will pass the ownership to the Wallet from client 1, simulating that this Client 1 has bought the car from dealer shop.
                    </p>
                    
                    <ModalOem></ModalOem>
                </div>

                <div className="flex flex-col justify-start items-center gap-5 p-6 min-h-[60vh]" >
                    <p className="line w-[100%] md:w-[50%] text-xl text-white font-bold text-center">
                    Only the OEM can add new licensed Repair Shops to modify the information included in the Nfts.
                    </p>
                    <ModalAllowRepairShop></ModalAllowRepairShop>
                </div>
            </div>

            <div className="mt-auto">
                <CodersComp></CodersComp>
            </div>
        </div>
    );
}
