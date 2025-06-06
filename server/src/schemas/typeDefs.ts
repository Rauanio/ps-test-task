import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type File {
    id: ID!
    url: String!
  }

  type Query {
    getFile(id: ID!): String!
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;
