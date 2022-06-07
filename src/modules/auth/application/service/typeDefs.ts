import { gql } from 'graphql-tag';
import { IMAGE_TYPE, STATUS_ENUM_TYPE } from '@shared/graphql/types';

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
    updateProfile(id: ID!, payload: UserUpdateInput!): User!
    login(email: String!, password: String): AuthResponse!
    signUp(data: UserInput!): AuthResponse!
  }

  type AuthResponse {
    jwt: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    addresses: [ID]
    password: String!
  }

  input UserUpdateInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    addresses: [ID]
  }

  ${STATUS_ENUM_TYPE}
  ${IMAGE_TYPE}
`;

export default auth;
