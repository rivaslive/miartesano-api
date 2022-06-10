import { gql } from 'graphql-tag';
import {
  CATEGORY_TYPE,
  IMAGE_TYPE,
  PRODUCT_TYPE,
  SELLER_TYPE,
  STATUS_SALE_ENUM_TYPE,
} from '@shared/graphql/types';

const types = gql`
  type Query {
    sale(id: ID!): Sale!
    shoppingCart: Sale!
  }

  type Mutation {
    addItemCart(id: ID!, quantity: Int!): SuccessAction!
    removeItemCart(id: ID!): SuccessAction!
    clearItemsCart: SuccessAction!
  }

  type SuccessAction {
    success: Boolean!
  }

  type Sale {
    id: ID!
    discount: Float!
    subTotal: Float!
    total: Float!
    delivery: Float!
    direction: String!
    items: [ItemSaleType]!
    status: StatusType!
    user: UserType!
  }

  type UserType {
    id: ID!
  }

  type ItemSaleType {
    id: ID!
    quantity: Int!
    subTotal: Float!
    product: ProductType!
  }

  ${STATUS_SALE_ENUM_TYPE}
  ${IMAGE_TYPE}
  ${SELLER_TYPE}
  ${CATEGORY_TYPE}
  ${PRODUCT_TYPE}
`;

export default types;
