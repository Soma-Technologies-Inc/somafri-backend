import { gql } from 'apollo-server-express';

export default gql`
  type Playlist {
    Id: Int!
    title: String!
    date: String!
    audios:[Audio!]!
  }

  
  extend type Query {
    getTCurrentDatePlaylist: [Playlist!]!
  }
`;

