// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//ERRORS
error CarNft_Not_Alloweed_RepairShop();

contract Bmw_3er is ERC721, ERC721URIStorage, Ownable {
    event NewOwner(address indexed _newOwnerOfNft);
    event RepairShopsApproved(address[] repairShops);
    event OdometerUpdated(address whichRepairShop, string uri);
    event RepairLogUpdated(address whichRepairShop, string uri);
    event AccidentsUpdated(address whichRepairShop, string uri);

    address private ownerOEM;
    uint256 tokenIdIndex;
    address[] public repairShopsAllowed;
    uint256 public numberOfRevisionsOdometer;
    uint256 public numberOfRevisionsLogs;
    uint256 public numberOfRevisionsAccidents;

    enum State {
        Reviewed,
        UpdateRequired,
        UnderReview
    }

    struct Vehicle {
        string manufacturerMetadata;
        string odometer;
        string repairLog;
        string accidentsTracking;
    }

    mapping(uint256 => Vehicle) public s_historyCar;
    mapping(uint256 => address[]) public s_historyOfOwners;

    constructor() ERC721("Bmw_3er", "BMW3") Ownable(msg.sender) {
        ownerOEM = msg.sender;
        repairShopsAllowed.push(ownerOEM);
    }

    //* Creation of the NFT for each car new produced
    function safeMint(
        address to,
        string memory uri,
        string memory _odometer,
        string memory _repairLog,
        string memory _accidentsTracking
    ) public onlyOwner {
        _safeMint(to, tokenIdIndex);
        _setTokenURI(tokenIdIndex, uri);

        Vehicle memory vehicle = Vehicle({
            manufacturerMetadata: uri,
            odometer: _odometer,
            repairLog: _repairLog,
            accidentsTracking: _accidentsTracking
        });

        s_historyCar[tokenIdIndex] = vehicle;
        s_historyOfOwners[tokenIdIndex].push(to);

        tokenIdIndex++;
    }

    function safeTransferFromAndHistory(
        address from,
        address to,
        uint256 tokenId
    ) external {
        safeTransferFrom(from, to, tokenId, "");
        s_historyOfOwners[tokenId].push(to);
    }

    //* The OEM has the power to approve authorize repairShops that
    //* are the only ones in addition to the OEM with power to update the
    //* history of the car.

    function approveRepairShops(
        address[] memory _repairShops
    ) external onlyOwner {
        for (uint i = 0; i < _repairShops.length; i++) {
            repairShopsAllowed.push(_repairShops[i]);
        }

        emit RepairShopsApproved(_repairShops);
    }

    //*Updates of the historical data of the Vehicle only by authorized repairshops

    function updateNft(
        uint256 _tokenId,
        string memory _newURI
    ) external onlyOwner {
        _setTokenURI(_tokenId, _newURI);
        Vehicle storage vehicle = s_historyCar[_tokenId];
        vehicle.manufacturerMetadata = _newURI;
    }

    function updateOdometer(
        uint256 _tokenId,
        string memory _newOdometer
    ) external OnlyAllowedRepairShops {
        Vehicle storage vehicle = s_historyCar[_tokenId];

        vehicle.odometer = _newOdometer;
        numberOfRevisionsOdometer++;

        emit OdometerUpdated(msg.sender, _newOdometer);
    }

    function updateRepairLog(
        uint256 _tokenId,
        string memory _repairLog
    ) external OnlyAllowedRepairShops {
        Vehicle storage vehicle = s_historyCar[_tokenId];

        vehicle.repairLog = _repairLog;
        numberOfRevisionsLogs++;

        emit RepairLogUpdated(msg.sender, _repairLog);
    }

    function updateAccidentsTracking(
        uint256 _tokenId,
        string memory _accidentsTracking
    ) external OnlyAllowedRepairShops {
        Vehicle storage vehicle = s_historyCar[_tokenId];

        vehicle.accidentsTracking = _accidentsTracking;
        numberOfRevisionsAccidents++;

        emit AccidentsUpdated(msg.sender, _accidentsTracking);
    }

    function getRepairShopsAllowed() external view returns (address[] memory) {
        return repairShopsAllowed;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    modifier OnlyAllowedRepairShops() {
        bool allowed = false;
        for (uint i = 0; i < repairShopsAllowed.length; i++) {
            if (msg.sender == repairShopsAllowed[i]) {
                allowed = true;
            }
        }

        if (!allowed) {
            revert CarNft_Not_Alloweed_RepairShop();
        }
        _;
    }
}
