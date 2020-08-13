import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    primaryLanguageId: Int!
    isVerified: Boolean!
  }
  type Query {
    getOneUser(id: Int!): User
    getUsers: [User!]!
    me:User
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      primaryLanguageId: Int!
      isVerified: Boolean
    ): userInfo!

    loginUser(
      email: String!
      password: String!
    ): loginInfo!
  }

  type userInfo {
    firstName: String!
    lastName: String!
    email: String!
    token: String!
    primaryLanguageId: Int!
    isVerified: Boolean
  }

  type loginInfo {
    status: String!
    message: String!
    token: String!
  }

`;

