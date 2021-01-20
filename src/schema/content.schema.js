import { gql } from 'apollo-server-express';

export default gql`
  type specificRootContent {
    id: Int
    rootCourseId: Int
    chapter: Int
    content: String
    contentImage: String
    contentAudio: String
  }
  type getRootContents {
    count: Int
    rows: [rootContent]
  }
  type getContents {
    count: Int
    rows: [contentData]
  }

  extend type Query {
    getSpecificRootContent(id: Int!): [specificRootContent]
    getRootContents: getRootContents
    getCourseRootContents(courseId: Int!): getRootContents
    getContentByRootContent(rootContentId: Int!): getContents
  }
`;
