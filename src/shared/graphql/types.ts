import gql from 'graphql-tag';

export const STATUS_SALE_ENUM_TYPE = gql`
  enum StatusType {
    waiting
    approved
    delivery
    rejected
    completed
  }
`;

export const STATUS_ENUM_TYPE = gql`
  enum StatusType {
    active
    inactive
    deleted
  }
`;

export const IMAGE_TYPE = gql`
  type ImageType {
    url: String!
    placeholder: String
    originalName: String
    mimetype: String
  }
`;

export const SELLER_TYPE = gql`
  type SellerType {
    firstName: String!
    lastName: String!
    comercialName: String!
    address: String!
    NRC: String!
    identification: String!
    status: StatusType!
  }

  ${STATUS_ENUM_TYPE}
`;

export const CATEGORY_TYPE = gql`
  type CategoryType {
    name: String!
    image: ImageType!
    status: StatusType!
  }

  ${STATUS_ENUM_TYPE}
  ${IMAGE_TYPE}
`;

export const PRODUCT_TYPE = gql`
  type ProductType {
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
