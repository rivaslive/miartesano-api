import { gql } from 'graphql-tag';
import {
  CATEGORY_TYPE,
  IMAGE_TYPE,
  SELLER_TYPE,
  STATUS_ENUM_TYPE,
} from '@shared/graphql/types';

const types = gql`
  scalar Upload

  type Query {
    product(id: ID!): Product!
    products: [Product]!
  }

  type Mutation {
    createProduct(data: ProductInput!): Product!
    updateProduct(id: ID!, payload: UpdateProductInput!): Product!
    deleteProduct(id: ID!): DeleteProductInput!
  }

  input ProductInput {
    name: String!
    thumbnail: ID!
    images: [ID]!
    category: ID!
    description: String!
    price: Float!
    stock: Int!
    seller: ID!
    specs: String
  }

  input UpdateProductInput {
    name: String
    thumbnail: ID
    images: [ID]
    category: ID
    description: String
    price: Float
    stock: Int
    seller: ID
    specs: String
    status: StatusType
  }

  type DeleteProductInput {
    deleted: Boolean!
  }

  type Product {
    id: ID!
    name: String!
    category: CategoryType!
    thumbnail: ImageType!
    images: [ImageType]!
    description: String!
    price: Float!
    stock: Int!
    seller: SellerType!
    status: StatusType!
    specs: String
  }

  ${STATUS_ENUM_TYPE}
  ${IMAGE_TYPE}
  ${SELLER_TYPE}
  ${CATEGORY_TYPE}
`;

export default types;
