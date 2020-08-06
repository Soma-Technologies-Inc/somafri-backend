const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
  }
  type Mutation {
    createUser(
      email: String!
      firstName: String!
      lastName: String!
      isVerified: Boolean
    ): User!
  }
`;
module.exports = typeDefs;
