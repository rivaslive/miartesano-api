import { gql } from 'graphql-tag';

const types = gql`
  scalar Upload

  type Query {
    file(id: ID!): FileData!
    files: [FileData]!
  }

  type Mutation {
    uploadFile(file: Upload): FileData!
    updateFile(id: ID!, file: Upload!): FileData!
    deleteFile(id: ID!): DeleteType!
  }

  type FileData {
    id: ID!
    url: String!
    originalName: String!
    mimetype: String!
    placeholder: String
  }

  type DeleteType {
    deleted: Boolean!
  }
`;

export default types;
