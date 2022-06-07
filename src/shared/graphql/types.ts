import gql from 'graphql-tag';

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
  }
`;
