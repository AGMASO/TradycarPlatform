import { gql } from "@apollo/client";

const GET_ACTIVE_LISTINGS_FILTERED = gql`
  query GetActiveOffers($seller: String!) {
    activeNewListings(first: 5, where: { seller: $seller }) {
      id
      seller
      carListingIndex
      nftAddress
      price
      tokenId
      sellingStatus
    }
  }
`;

export default GET_ACTIVE_LISTINGS_FILTERED;
