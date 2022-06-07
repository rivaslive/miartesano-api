import { gql } from 'graphql-tag';
import {
  IMAGE_TYPE,
  STATUS_ENUM_TYPE,
} from '@shared/graphql/types';

const auth = gql`
  scalar Upload

  type Query {
    category(id: ID!): Category!
    categories: [Category]!
  }

  type Category {
    id: ID!
    name: String!
    image: ImageType
    status: StatusType!
  }

  type Mutation {
    createCategory(data: CategoryInput): Category!
    updateCategory(id: ID!, payload: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Category!
  }

  input CategoryInput {
    name: String!
    image: Upload
  }

  input UpdateCategoryInput {
    name: String
    image: Upload
  }

  ${STATUS_ENUM_TYPE}
  ${IMAGE_TYPE}
`;

export default auth;
