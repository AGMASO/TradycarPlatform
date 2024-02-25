import { gql } from "@apollo/client";

const GET_APPROVED_OFFER_FOR_PAY = gql`
  query GetApprovedOfferForPay($buyer: String!) {
    activeNewOffers(
      first: 5
      where: { and: [{ buyer: $buyer }, { acceptance: 0 }] }
    ) {
      buyer
      price
      offerIndex
      acceptance
      nftAddress
      nftTokenId
    }
  }
`;

export default GET_APPROVED_OFFER_FOR_PAY;
