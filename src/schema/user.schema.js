import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String
    isVerified: Boolean!
  }
  type Query {
    getOneUser(id: Int!): User
    getUsers: [User!]!
    me:User
  }
  type Mutation {
    createUser(
      email: String!
      firstName: String!
      lastName: String!
      isVerified: Boolean
    ): Token!
  }

  type Token {
    token: String!
  }

`;

