import { gql } from "@apollo/client";

const GET_ALL_LISTINGS_OPEN = gql`
  query GetAllListingsActive {
    activeNewListings(first: 10) {
      id
      seller
      carListingIndex
      nftAddress
      tokenId
      price
      sellingStatus
    }
  }
`;

export default GET_ALL_LISTINGS_OPEN;
