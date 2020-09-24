import { gql } from "apollo-server-express";

export default gql`
  type rootCourse {
    id: Int
    name: String
    courseIcon: String
    levelId: Int
    complexity: Int
    createdAt: Date
    updatedAt: Date
  }
  type Course {
    name: String!
  }
  type course {
    id: Int!
    name: String!
    courseIcon: String!
    rootCourseId: Int!
    Course: Course!
  }
  type courses {
    id: Int!
    name: String!
    rootCourseId: Int!
    rootCourse: rootCourse!
  }
  type languageCourse {
    id: Int!
    name: String!
    languageId: Int!
    rootCourseId: Int
    levelId: Int
    complexity: Int
    courseIcon: String
    createdAt: Date
    updatedAt: Date
    rootCourse: rootCourse
  }
  type primaryCourse {
    id: Int!
    name: String!
    rootCourseId: Int!
  }
  type chapter {
    currentChapter: Int
    totalChapter: Int
    testResult: String
  }
  type languageCourses {
    languageCourse: languageCourse!
    primaryCourse: primaryCourse!
    chapter: chapter!
  }
  type rootContent {
    id: Int
    rootCourseId: Int
    chapter: Int
    content: String
    contentImage: String
    contentAudio: String
  }
  type learningLanguageContents {
    id: Int
    rootContentId: Int
    languageId: Int
    content: String
    contentAudio: String
  }
  type primaryLanguageContents {
    id: Int
    rootContentId: Int
    languageId: Int
    content: String
    contentAudio: String
  }
  type contentData {
    id: Int
    rootContentId: Int
    languageId: Int
    content: String
    contentAudio: String
    learningLanguageContents: learningLanguageContents
    primaryLanguageContents: primaryLanguageContents
  }
  type courseContents {
    rootContent: [rootContent]
    contentData: [contentData]
  }
  type learnLanguage {
    rootContent: [rootContent]
    contentData: [contentData]
  }
  type rows {
    id: Int
    courseId: Int
    languageId: Int
    courseIcon: String
    courseName: String
    translatedCourseName: String
    courseComplexity: Int
    levelCourses: Int
    currentChapter: Int
    totalChapter: Int
  }
  type recentCourses {
    count: Int
    rows: [rows]
  }
  extend type Query {
    getSpecificLanguageCourses(languageId: Int!): [courses!]!
    getCoursesByLevel(levelId: Int!): [course!]!
    getLanguageCourses(languageId: Int!): [languageCourses!]!
    getCourseContents(languageId: Int!, courseId: Int!): courseContents!
    getUserCourseContents(
      languageId: Int!
      courseId: Int!
      page: Int!
    ): learnLanguage!
    recentCourses: recentCourses!
  }
`;
