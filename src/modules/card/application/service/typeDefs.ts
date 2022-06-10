import { gql } from 'graphql-tag';

const types = gql`
  type Query {
    card(id: ID!): Card!
    cards: [Card]!
  }

  type Mutation {
    createCard(data: CardInput!): Card!
    updateCard(id: ID! data: CardUpdateInput!): Card!
    deleteCard(id: ID!): SuccessAction!
  }

  input CardInput {
    firstName: String!
    lastName: String!
    cardNumber: String!
    CVC: String!
    exp: String!
  }

  input CardUpdateInput {
    firstName: String
    lastName: String
    status: StatusType
  }

  type Card {
    id: ID!
    firstName: String!
    lastName: String!
    cardNumber: String!
    CVC: String!
    exp: String!
    status: StatusType!
  }

  type SuccessAction {
    success: Boolean!
  }

  enum StatusType {
    active
    inactive
    blacklist
  }
`;

export default types;
