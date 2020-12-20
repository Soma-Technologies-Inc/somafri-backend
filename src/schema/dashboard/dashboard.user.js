import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllUsers(page: Int!): [User!]!
    changeRole(userId: Int!, newRole: String!): User!
    activateDeactivate(userId: Int!): String
    activateAccounts: String
  }
`;
