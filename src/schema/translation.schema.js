import { gql } from 'apollo-server-express';

export default gql`
  type Translation {
    id: Int!
    question: String!
    answer: String!
    from: String!
    to: String!
    userId:Int!
  }

  type Translations {
    translationId: Int
    BeforeTranslation:BeforeTranslation!
    AfterTranslation:AfterTranslation!
  }

  type BeforeTranslation{
    language:String!
    text:String!
  }
  type AfterTranslation{
    language:String!
    text:String!
  }
  extend type Query {
    getTranslationsByUserId(userId: Int!): [Translations!]!
    getTranslations: [Translation]
    deleteTranslation(id: Int!): String
  }

`;
