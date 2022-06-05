import { gql } from 'graphql-tag';
import {
  IMAGE_TYPE,
  STATUS_ENUM_TYPE,
} from '@application/shared/graphql/types';

const auth = gql`
  type Query {
    Profile(id: ID!): User!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    avatar: ImageType!
    status: StatusType!
    createdAt: String!
    addresses: [LocationType]
  }

  type LocationType {
    address: String!
    state: String!
    municipality: String!
    status: StatusType!
    createdAt: String!
    reference: String
  }

  type Mutation {
    updateUser(id: ID! payload: UserInput!): User!
    login(email: String! password: String): AuthResponse!
    signUp(email: String! password: String): AuthResponse!
  }

  type AuthResponse {
    jwt: String!
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    addresses: [ID]
    password: String
  }

  ${STATUS_ENUM_TYPE}
  ${IMAGE_TYPE}
`;

export default auth;
