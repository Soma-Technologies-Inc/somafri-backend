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

  type Translations {
    BeforeTranslation:BeforeTranslation!
    AfterTranslation:AfterTranslation!
  }

  type BeforeTranslation{
    from:String!
    question:String!
  }
  type AfterTranslation{
    to:String!
    answer:String!
  }
  extend type Query {
    getTranslationsByUserId(userId: Int!): [Translations!]!
  }

`;

