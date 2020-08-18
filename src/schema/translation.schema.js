import { gql } from 'apollo-server-express';

export default gql`
  type Translation {
    ID: Int!
    question: String!
    answer: String!
    from: String!
    to: String!
    userId:Int!
  }
  extend type Query {
    getTranslationsByUserId(userId: Int!): [Translation!]!
  }
`;

