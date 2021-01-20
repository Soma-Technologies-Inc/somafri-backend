import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    updateUsers(
      title: String!
      message: String!
    ): String
  }
`;
