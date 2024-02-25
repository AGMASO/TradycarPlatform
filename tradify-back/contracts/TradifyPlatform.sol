// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//IMPORTS
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./utils/console.sol";

error Escrow_Approve_trying_to_execute_but_the_balance_is_not_equal_to_priceToPay();
error Escrow_Issue_to_approve_this_escrow();

contract Escrow is IERC721Receiver {
    //EVENTS
    event Escrow_Created(
        address indexed _escrowAddress,
        address indexed _beneficiary,
        address indexed _depositor
    );
    event Escrow_Approved(address newOwnerOfNft, uint balanceSentToBeneficiary);
    event Escrow_Depositor_Has_Paid(
        address _depositor,
        uint256 valuePaid,
        uint256 _priceToPay
    );
    event Escrow_Nft_sent_to_Escrow(
        address _nftAddress,
        uint256 _tokenId,
        address _sender
    );

    address public arbiter; //Smart Contract TradifyPlatform
    address public beneficiary; //seller
    address public depositor; //buyer
    uint256 public priceToPay; //amount that is agreeded to be paid for the CarNft
    address public nftAddress;
    uint256 public tokenIdNft;
    bool public isApproved;

    constructor(
        address _arbiter,
        address _beneficiary,
        address _depositor,
        uint256 _priceToPay,
        address _nftAddress,
        uint256 _tokenIdNft
    ) {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = _depositor;
        priceToPay = _priceToPay;
        nftAddress = _nftAddress;
        tokenIdNft = _tokenIdNft;

        emit Escrow_Created(address(this), beneficiary, depositor);
    }

    function depositorPayment(
        address _realDepositor
    ) external payable OnlyDepositor(_realDepositor) {
        console.log("Hola");

        emit Escrow_Depositor_Has_Paid(_realDepositor, msg.value, priceToPay);
    }

    function sendNft() external {
        //*We have to approve first the Escrow contract to use safeTransferFrom()

        IERC721 carNft = IERC721(nftAddress);
        require(
            carNft.ownerOf(tokenIdNft) == msg.sender,
            "You are not the owner of the NFT"
        );

        carNft.safeTransferFrom(
            carNft.ownerOf(tokenIdNft),
            address(this),
            tokenIdNft
        );

        emit Escrow_Nft_sent_to_Escrow(nftAddress, tokenIdNft, msg.sender);
    }

    function approve() public {
        require(msg.sender == arbiter, "You are not the Arbiter");
        uint balance = address(this).balance;
        if (balance == priceToPay) {
            IERC721 carNft = IERC721(nftAddress);

            carNft.safeTransferFrom(address(this), depositor, tokenIdNft);

            isApproved = true;

            (bool sent, ) = payable(beneficiary).call{value: balance}("");
            require(sent, "Failed to send Ether");

            emit Escrow_Approved(carNft.ownerOf(tokenIdNft), balance);

            console.log("holaFinal");
        } else {
            revert Escrow_Approve_trying_to_execute_but_the_balance_is_not_equal_to_priceToPay();
        }
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) external override returns (bytes4) {
        // Implement any additional logic if needed
        return this.onERC721Received.selector;
    }

    modifier OnlyDepositor(address _buyer) {
        require(_buyer == depositor, "You are not allowed to buy this car");
        _;
    }
}

//ERRORS

error TradifyPlatform_Is_Not_Approved_For_This_Nft();
error TradifyPlatform_NotOwner();
error TradifyPlatform_You_are_triying_to_list_a_carNft_already_listed();
error TradifyPlatform_You_cant_reject_an_offer_if_you_are_not_the_creator_of_listing();
error TradifyPlatform_No_escrow_active_for_this_data();

contract TradifyPlatform is ReentrancyGuard {
    //EVENTS

    event NewCarListing(
        address seller,
        uint256 carListingIndex,
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        Status sellingStatus
    );

    event NewOffer(
        address buyer,
        address nftAddress,
        uint256 nftTokenId,
        uint256 price,
        uint256 offerIndex,
        Acceptance acceptance
    );
    event OfferAcceptedListingClosed(
        Acceptance acceptance,
        uint256 offerIndex,
        address nftAddress
    );

    event OfferRejected(
        address nftAddress,
        uint256 nftTokenId,
        uint256 offerIndex,
        Acceptance acceptance
    );

    event NewEscrowCreated(
        address newEscrow,
        address arbiter,
        address beneficiary,
        address depositor
    );
    event PaymentToEscrowCompleted(
        address escrowAddress,
        address buyer,
        address nftAddress,
        uint nftTokenId
    );

    enum Status {
        Open,
        Close
    }
    enum Acceptance {
        Accepted,
        Rejected,
        Pending
    }
    struct CarListing {
        address seller;
        uint256 price;
        uint256 nftId;
        address buyer;
        Status sellingStatus;
    }

    struct Offer {
        address buyer;
        uint256 price;
        Acceptance acceptance;
    }

    uint256 private carListingIndex;

    //* address of NFT contract to NFT ID to a Item struct
    mapping(address => mapping(uint => CarListing)) public s_carListings;

    //* address of NFT contract to NFT ID to a array of Offer structs
    mapping(address => mapping(uint => Offer[])) public s_offers;

    //* address of Nft to TokenID to address of the buyer to a Escrow type contract
    mapping(address => mapping(uint => mapping(address => address)))
        public s_escrows;

    constructor() {}

    /*
     * @Method used to list a new Car to Platform
     */

    function listCar(
        address _nftAddress,
        uint256 _price,
        uint256 _nftTokenId
    )
        external
        isOwner(_nftAddress, _nftTokenId, msg.sender)
        isAlreadyListed(_nftAddress, _nftTokenId)
    {
        IERC721 carNft = IERC721(_nftAddress);

        if (carNft.getApproved(_nftTokenId) != address(this)) {
            revert TradifyPlatform_Is_Not_Approved_For_This_Nft();
        }

        _createCarListing(_nftAddress, _nftTokenId, _price);
    }

    function _createCarListing(
        address _nftAddress,
        uint _nftTokenId,
        uint _price
    ) internal {
        CarListing memory newCarListing = CarListing({
            seller: msg.sender,
            price: _price,
            nftId: _nftTokenId,
            buyer: address(0),
            sellingStatus: Status.Open
        });

        s_carListings[_nftAddress][_nftTokenId] = newCarListing;

        carListingIndex++;

        emit NewCarListing(
            msg.sender,
            carListingIndex,
            _nftAddress,
            _nftTokenId,
            _price,
            newCarListing.sellingStatus
        );
    }

    //*END*//

    /*
     * @Method used to create an offer for a Car
     */

    function createOffer(
        address _nftAddress,
        uint256 _price,
        uint256 _nftTokenId
    ) external {
        CarListing memory carListing = s_carListings[_nftAddress][_nftTokenId];

        require(
            carListing.sellingStatus == Status.Open,
            "Car Listing doesnt exists"
        );
        require(_price > 0, " You cant offer 0");

        uint256 offerIndex = s_offers[_nftAddress][_nftTokenId].length; // Get the current length of the array as the index

        Offer memory newOffer = Offer(msg.sender, _price, Acceptance.Pending);

        s_offers[_nftAddress][_nftTokenId].push(newOffer);

        emit NewOffer(
            msg.sender,
            _nftAddress,
            _nftTokenId,
            _price,
            offerIndex,
            newOffer.acceptance
        );
    }

    //*END*//

    /*
     * @Method used to reject an offer already created by a buyer.
     * Only the Creator of the listing can reject.
     */
    function rejectOffer(
        address _nftAddress,
        uint256 _nftTokenId,
        uint256 _offerIndex
    ) external {
        require(
            msg.sender == s_carListings[_nftAddress][_nftTokenId].seller,
            "You are not the creator of the listing"
        );
        Offer[] storage offers = s_offers[_nftAddress][_nftTokenId];

        require(
            offers[_offerIndex].acceptance == Acceptance.Pending &&
                offers[_offerIndex].price > 0,
            "This offer was already accepted or no valid"
        );

        offers[_offerIndex].acceptance = Acceptance.Rejected;

        emit OfferRejected(
            _nftAddress,
            _nftTokenId,
            _offerIndex,
            offers[_offerIndex].acceptance
        );
    }

    function acceptOffer(
        address _nftAddress,
        uint256 _nftTokenId,
        uint256 _offerIndex
    ) external isOwner(_nftAddress, _nftTokenId, msg.sender) {
        Offer[] storage offers = s_offers[_nftAddress][_nftTokenId];
        CarListing storage carListing = s_carListings[_nftAddress][_nftTokenId];

        require(
            offers[_offerIndex].acceptance == Acceptance.Pending &&
                offers[_offerIndex].price > 0,
            "This offer was already accepted"
        );

        offers[_offerIndex].acceptance = Acceptance.Accepted;

        for (uint i = 0; i < offers.length; i++) {
            if (offers[i].acceptance == Acceptance.Pending) {
                this.rejectOffer(_nftAddress, _nftTokenId, i);
            }
        }

        carListing.sellingStatus = Status.Close;

        console.log("Hola3");

        //*Creation of a new escrow contract for this carListing
        Escrow newEscrow = new Escrow(
            address(this),
            carListing.seller,
            offers[_offerIndex].buyer,
            offers[_offerIndex].price,
            _nftAddress,
            _nftTokenId
        );
        console.log("Hola4");
        s_escrows[_nftAddress][_nftTokenId][
            offers[_offerIndex].buyer
        ] = address(newEscrow);
        console.log("THis is newEscrow", address(newEscrow));
        console.log(
            "This is iniside of s_escrows",
            s_escrows[_nftAddress][_nftTokenId][offers[_offerIndex].buyer]
        );
        emit OfferAcceptedListingClosed(
            offers[_offerIndex].acceptance,
            _offerIndex,
            _nftAddress
        );

        emit NewEscrowCreated(
            address(newEscrow),
            address(this),
            carListing.seller,
            offers[_offerIndex].buyer
        );

        //* Sending the CarNft to the Escrow
    }

    function paymentToEscrow(
        address _nftAddress,
        uint256 _nftTokenId
    ) external payable EscrowActive(_nftAddress, _nftTokenId, msg.sender) {
        console.log(
            "This is iniside of s_escrows",
            s_escrows[_nftAddress][_nftTokenId][msg.sender]
        );

        console.log("Hola");
        Escrow recoverEscrow = Escrow(
            s_escrows[_nftAddress][_nftTokenId][msg.sender]
        );

        require(
            msg.sender == recoverEscrow.depositor(),
            "You are not the depositor stablished in the Escrow"
        );
        require(
            msg.value == recoverEscrow.priceToPay(),
            "You cant continue because you are not paying the amount accepted"
        );

        console.log("Hola2");
        recoverEscrow.depositorPayment{value: msg.value}(msg.sender);
        console.log("Hola3");
        emit PaymentToEscrowCompleted(
            address(recoverEscrow),
            msg.sender,
            _nftAddress,
            _nftTokenId
        );

        if (recoverEscrow.priceToPay() == address(recoverEscrow).balance) {
            recoverEscrow.approve();
        }
    }

    modifier isOwner(
        address _nftAddress,
        uint256 _tokenId,
        address _spender
    ) {
        IERC721 carNft = IERC721(_nftAddress);
        address owner = carNft.ownerOf(_tokenId);
        if (_spender != owner) {
            revert TradifyPlatform_NotOwner();
        }
        _;
    }

    modifier isAlreadyListed(address _nftAddress, uint256 _tokenId) {
        CarListing memory carListing = s_carListings[_nftAddress][_tokenId];

        if (carListing.seller != address(0) && carListing.price > 0) {
            revert TradifyPlatform_You_are_triying_to_list_a_carNft_already_listed();
        }
        _;
    }

    modifier EscrowActive(
        address _nftAddress,
        uint256 _tokenId,
        address _sender
    ) {
        if (s_escrows[_nftAddress][_tokenId][_sender] == address(0)) {
            revert TradifyPlatform_No_escrow_active_for_this_data();
        }

        _;
    }
}
