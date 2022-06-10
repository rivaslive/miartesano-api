import { gql } from 'graphql-tag';
import { STATUS_ENUM_TYPE } from '@shared/graphql/types';

const types = gql`
  scalar Upload

  type Query {
    seller(id: ID!): Seller!
    sellers: [Seller]!
  }

  type Mutation {
    createSeller(data: SellerInput): Seller!
    updateSeller(id: ID!, payload: UpdateSellerInput!): Seller!
    deleteSeller(id: ID!): Seller!
  }

  input SellerInput {
    firstName: String!
    lastName: String!
    comercialName: String!
    address: String!
    NRC: String!
    identification: String!
  }

  input UpdateSellerInput {
    firstName: String
    lastName: String
    comercialName: String
    address: String
    NRC: String
    identification: String
    status: StatusType
  }

  type Seller {
    id: ID!
    firstName: String!
    lastName: String!
    comercialName: String!
    address: String!
    NRC: String!
    identification: String!
    status: StatusType!
    createdAt: String!
  }

  ${STATUS_ENUM_TYPE}
`;

export default types;
