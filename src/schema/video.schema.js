import { gql } from 'apollo-server-express';

export default gql`
  type Video {
    id: Int!
    title: String!
    videoLink: String!
    languageId: Int!
    genre: String!
    category:String!
  }
  extend type Query {
    getVideoByLanguageId(languageId: Int!): [Video!]!
    getAllVideo: [Video!]!
    getVideoByCategory(category:String!): [Video!]!
    getVideoByCategoryAndLanguageId(languageId:Int!, category:String!): [Video!]!
    getVideoById(id: Int!): Video!

  }
`;

