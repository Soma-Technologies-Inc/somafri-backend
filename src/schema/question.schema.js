import { gql } from "apollo-server-express";

export default gql`
  type rootQuestion {
    id: Int
    rootCourseId: Int
    firstPart: String
    secondPart: String
    rootQuestionId: Int
    rootCourse: rootCourse
    rootQuestion: root_Question
    languageId: Int
    createdAt: Date
    updatedAt: Date
  }
  type root_Question {
    id: Int
    rootCourseId: Int
    firstPart: String
    secondPart: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Mutation {
    addRootQuestion(
      rootCourseId: Int
      firstPart: String
      secondPart: String
    ): rootQuestion

    addQuestion(
      rootQuestionId: Int
      languageId: Int
      firstPart: String
      secondPart: String
    ): rootQuestion
  }

  type question {
    questionName: String
    rootContentId: Int
  }
  type answers {
    answer: String
    rootContentId: Int
    contentImage: String
  }
  type Tests {
    firstPart: String
    secondPart: String
    question:question
    answers:[answers]
  }

  extend type Query {
    getRootQuestion(rootCourseId: Int!): [rootQuestion]
    getQuestion(questionId: Int!): [rootQuestion]
    getTests(languageId: Int!, courseId: Int!): [Tests]
  }
`;
