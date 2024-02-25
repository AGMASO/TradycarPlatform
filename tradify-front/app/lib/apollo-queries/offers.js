import { gql } from "@apollo/client";

const GET_ACTIVE_OFFERS = gql`
  query GetActiveNewOffers($nftAddress: String!, $_nftTokenId: String!) {
    activeNewOffers(
      first: 5
      where: {
        and: [
          { nftAddress: $nftAddress }
          { nftTokenId: $_nftTokenId }
          { acceptance: 2 }
        ]
      }
    ) {
      buyer
      price
      offerIndex
      acceptance
    }
  }
`;

export default GET_ACTIVE_OFFERS;
