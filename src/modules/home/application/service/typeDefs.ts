import { gql } from 'graphql-tag';

const types = gql`
  type Query {
    homeLayout: ResponseHome!
  }

  type ResponseHome {
    banners: [BannerType]
    miniBanners: [MiniBannerType]!
    products: [ProductType]!
  }

  type BannerType {
    id: ID!
    name: String!
    image: ImageType!
  }

  type MiniBannerType {
    id: ID!
    image: ImageType!
  }
`;

export default types;
