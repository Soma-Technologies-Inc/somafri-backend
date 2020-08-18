import { gql } from 'apollo-server-express';

export default gql`
  type Audio {
    id: Int!
    title: String!
    musicLink: String!
    languageId: Int!
    genre: String!
    category:String!
  }
  extend type Query {
    getAudioByLanguageId(languageId: Int!): [Audio!]!
    getAllAudios: [Audio!]!
    getAudioByCategory(category:String!): [Audio!]!
    getAudioByCategoryAndLanguageId(languageId:Int!, category:String!): [Audio!]!
    getAudioById(id: Int!): Audio!

  }
`;

