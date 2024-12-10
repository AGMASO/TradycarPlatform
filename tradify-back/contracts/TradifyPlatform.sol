// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// IMPORTS
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./utils/console.sol";

// ERRORS
error Escrow_Approve_trying_to_execute_but_the_balance_is_not_equal_to_priceToPay();
error Escrow_Issue_to_approve_this_escrow();


// CONTRACT
contract Escrow is IERC721Receiver {

    // EVENTS
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


    // MODIFIERS
    /// @notice Ensures that the function caller is the designated depositor.
    /// @param _buyer The address attempting the depositor-related action.
    modifier OnlyDepositor(address _buyer) {
        require(_buyer == depositor, "You are not allowed to buy this car");
        _;
    }

    // STATE VARIABLES
    address public arbiter;      // Smart Contract - TradifyPlatform
    address public beneficiary;  // Seller
    address public depositor;    // Buyer
    uint256 public priceToPay;   // Agreed payment for the CarNft
    address public nftAddress;
    uint256 public tokenIdNft;
    bool public isApproved;

    /// @notice Initializes a new Escrow contract with the given parameters.
    /// @param _arbiter The address of the arbiter responsible for final approval.
    /// @param _beneficiary The beneficiary (seller) who will receive the funds.
    /// @param _depositor The depositor (buyer) who will deposit the funds.
    /// @param _priceToPay The agreed-upon purchase amount for the NFT.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _tokenIdNft The token ID of the NFT involved in the escrow.
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

    /// @notice Allows the designated depositor to pay the agreed amount into the escrow.
    /// @dev The caller must be the known `depositor`.
    /// @param _realDepositor The address of the depositor calling this function.
    function depositorPayment(
        address _realDepositor
    ) external payable OnlyDepositor(_realDepositor) {
        console.log("Hola");
        emit Escrow_Depositor_Has_Paid(_realDepositor, msg.value, priceToPay);
    }

    /// @notice Allows the current owner of the specified NFT to transfer it into the escrow.
    /// @dev Caller must own the NFT and must have approved this contract to transfer the NFT.
    function sendNft() external {
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

    /// @notice Allows the arbiter to approve the transfer of funds and NFT if the conditions are met.
    /// @dev Requires the caller to be the arbiter. If the escrow has the correct funds, the NFT is transferred to the depositor and the funds to the beneficiary.
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

    /// @notice Handles the receipt of an NFT via `safeTransferFrom`.
    /// @dev This function is required by the IERC721Receiver interface.
    /// @param operator The address which called `safeTransferFrom` on the NFT contract.
    /// @param from The address which previously owned the NFT.
    /// @param tokenId The NFT identifier which is being transferred.
    /// @param data Additional data sent along with the transfer call.
    /// @return The selector to confirm that this contract can receive ERC721 tokens.
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) external override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}


// ERRORS
error TradifyPlatform_Is_Not_Approved_For_This_Nft();
error TradifyPlatform_NotOwner();
error TradifyPlatform_You_are_triying_to_list_a_carNft_already_listed();
error TradifyPlatform_You_cant_reject_an_offer_if_you_are_not_the_creator_of_listing();
error TradifyPlatform_No_escrow_active_for_this_data();


// CONTRACT
contract TradifyPlatform is ReentrancyGuard {

    // EVENTS
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

    // ENUMS
    enum Status {
    Open,
    Close
    }

    enum Acceptance {
    Accepted,
    Rejected,
    Pending
    }

    // STRUCTS
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
    // STATE VARIABLES
    uint256 private carListingIndex;

    // Mapping of NFT (by address and token ID) to its CarListing
    mapping(address => mapping(uint => CarListing)) public s_carListings;

    // Mapping of NFT (by address and token ID) to an array of offers
    mapping(address => mapping(uint => Offer[])) public s_offers;

    // Mapping of NFT (by address, token ID and buyer) to the Escrow contract address
    mapping(address => mapping(uint => mapping(address => address))) public s_escrows;

    // MODIFIERS

    /// @notice Ensures that the caller is the owner of the specified NFT.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _tokenId The ID of the NFT.
    /// @param _spender The address attempting the action.
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

    /// @notice Ensures the NFT is not already listed.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _tokenId The ID of the NFT.
    modifier isAlreadyListed(address _nftAddress, uint256 _tokenId) {
        CarListing memory carListing = s_carListings[_nftAddress][_tokenId];
        if (carListing.seller != address(0) && carListing.price > 0) {
            revert TradifyPlatform_You_are_triying_to_list_a_carNft_already_listed();
        }
        _;
    }

    /// @notice Ensures there is an active escrow for the given NFT and buyer.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _tokenId The ID of the NFT.
    /// @param _sender The address of the sender expected to have an active escrow.
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

    // CONSTRUCTOR

    /// @notice Deploys the TradifyPlatform contract.
    constructor() {}

    // EXTERNAL/PUBLIC FUNCTIONS

    /// @notice Lists a new car (NFT) for sale on the platform.
    /// @dev The caller must be the owner of the NFT and must have approved this contract.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _price The listing price for the NFT.
    /// @param _nftTokenId The ID of the NFT to be listed.
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

    /// @notice Creates an offer for a listed NFT.
    /// @dev The NFT must be listed and open for offers. The offer price must be > 0.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _price The price the buyer is offering.
    /// @param _nftTokenId The ID of the NFT to make an offer on.
    function createOffer(
        address _nftAddress,
        uint256 _price,
        uint256 _nftTokenId
        ) external {
        CarListing memory carListing = s_carListings[_nftAddress][_nftTokenId];
        require(carListing.sellingStatus == Status.Open, "Car Listing doesnt exists");
        require(_price > 0, "You cant offer 0");

        uint256 offerIndex = s_offers[_nftAddress][_nftTokenId].length;

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

    /// @notice Rejects a pending offer for a listed NFT.
    /// @dev Only the listing creator (seller) can reject offers.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _nftTokenId The ID of the NFT.
    /// @param _offerIndex The index of the offer to reject.
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

    /// @notice Accepts a pending offer for an NFT, closes the listing, creates escrow, and rejects all other pending offers.
    /// @dev Only the NFT owner can accept offers. Once accepted, other offers are automatically rejected.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _nftTokenId The ID of the NFT.
    /// @param _offerIndex The index of the accepted offer.
    function acceptOffer(
        address _nftAddress,
        uint256 _nftTokenId,
        uint256 _offerIndex
        ) external isOwner(_nftAddress, _nftTokenId, msg.sender) {
        Offer[] storage offers = s_offers[_nftAddress][_nftTokenId];
        CarListing storage carListing = s_carListings[_nftAddress][_nftTokenId];

        require(
            offers[_offerIndex].acceptance == Acceptance.Pending && offers[_offerIndex].price > 0,
            "This offer was already accepted"
        );

        offers[_offerIndex].acceptance = Acceptance.Accepted;

        // Reject all other pending offers
        for (uint i = 0; i < offers.length; i++) {
            if (offers[i].acceptance == Acceptance.Pending) {
                this.rejectOffer(_nftAddress, _nftTokenId, i);
            }
        }

        carListing.sellingStatus = Status.Close;
        console.log("Hola3");

        // Create a new escrow contract
        Escrow newEscrow = new Escrow(
            address(this),
            carListing.seller,
            offers[_offerIndex].buyer,
            offers[_offerIndex].price,
            _nftAddress,
            _nftTokenId
        );
        console.log("Hola4");

        s_escrows[_nftAddress][_nftTokenId][offers[_offerIndex].buyer] = address(newEscrow);
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
    }

    /// @notice Allows the buyer (depositor) to pay the agreed amount into escrow.
    /// @dev The caller must be the depositor set in the escrow, and must pay the exact price.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _nftTokenId The ID of the NFT.
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

    // INTERNAL FUNCTIONS

    /// @notice Internal function that creates a new car listing in the contract storage.
    /// @dev Increments the `carListingIndex` and emits a `NewCarListing` event.
    /// @param _nftAddress The address of the NFT contract.
    /// @param _nftTokenId The ID of the NFT.
    /// @param _price The listing price for the NFT.
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
}
