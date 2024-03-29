import { gql } from 'apollo-server-express';

export default gql`
  type language {
    id: Int
    name: String
    countryId: Int
    duplicatedLanguageId: String
    createdAt: Date
    updatedAt: Date
    country: country
    learnable: Boolean
    language_key: String
  }

  type learning {
    id: Int
    userId: Int
    currentLevel: Int
    languageId: Int
    LanguageName: String
    totalLevel: Int
    enrolledLanguage: String
    countryFlag: String
    currentCourseId: Int
    currentCourseName: String
    updatedAt: Date
    createdAt: Date
  }
  type usersLearnings {
    user: User
    enrolledLanguage: [learning]
  }
  type allLanguages {
    count: Int
    rows: [language]
  }

  extend type Query {
    getAllLanguages: allLanguages
    getLanguages: [language]
    getSpecificLanguage(id: Int!): language
    getLanguagesByCountry(countryName: String!): [language]
    enrollToLanguage(language: String!): learning
    getMyEnrolledLanguages: [learning]
    getUsersLearningLanguagess: [usersLearnings]
  }
`;
