import { gql } from 'graphql-tag';
import { IMAGE_TYPE, STATUS_ENUM_TYPE } from '@shared/graphql/types';

const types = gql`
  type Query {
    category(id: ID!): Category!
    categories: [Category]!
  }

  type Mutation {
    createCategory(data: CategoryInput): Category!
    updateCategory(id: ID!, payload: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Category!
  }

  input CategoryInput {
    name: String!
    image: ID!
  }

  input UpdateCategoryInput {
    name: String
    image: ID
  }

  type Category {
    id: ID!
    name: String!
    image: ImageType
    status: StatusType!
  }

  ${STATUS_ENUM_TYPE}
  ${IMAGE_TYPE}
`;

export default types;
