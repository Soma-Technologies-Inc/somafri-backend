import { gql } from 'apollo-server-express';

export default gql`
  type Music {
    id: Int!
    title: String!
    musicLink: String!
    languageId: Int!
    genre: String!
    category:String!
  }
  extend type Query {
    getMusicByLanguageId(languageId: Int!): [Music!]!
    getAllMusics: [Music!]!
    getMusicByCategory(category:String!): [Music!]!
    getMusicByCategoryAndLanguageId(languageId:Int!, category:String!): [Music!]!
    getMusicById(id: Int!): Music!

  }
  extend type Mutation {
    createMusic(
        title: String!
        musicLink: String!
        languageId: Int!
        genre: String!
    ): Music!
  }
`;

