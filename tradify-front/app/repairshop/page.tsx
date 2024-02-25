import MenuMain from "../ui/menu-main";
import CodersComp from "../ui/coderscomp";
import RepairShopCheckNft from '../ui/repairshop-check-nft'

export default function Repairshop() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900">  
            <MenuMain></MenuMain>
            <div className="flex flex-col flex-grow justify-between">
                <div className="min-h-20"></div>
                <div className="flex flex-row justify-center items-center gap-5 p-6 flex-grow">
                    <RepairShopCheckNft></RepairShopCheckNft>
                </div>
            </div>
            <div className="mt-auto">
                <CodersComp></CodersComp>
            </div>
        </div>
    )
}
