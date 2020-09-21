import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    primaryLanguageId: Int!
  }
  
  type Language {
    id: Int!
    userId: Int!
    currentLevel: Int!
    totalLevel: Int!
    languageId: Int!
    LanguageName: String
    countryFlag: String
    currentCourseId: String
    currentCourseName: String
    updatedAt: String
    createdAt: String
    }

  type Profile {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    profileImage: String
    gender: String
    country: String
    birthdate: String
    primaryLanguage: String
    role: String!
    Language:[Language]
  }
  type data {
    status: Int!
    message: String!
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    profileImage: String!
    role: String!
    isVerified: Boolean!
    primaryLanguageId: String!
    token: String!
  }
  type Query {
    getOneUser(id: Int!): User
    getUsers: [User!]!
    me:User
    getUserProfile: Profile
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      primaryLanguageId: Int!
    ): userInfo!

    loginUser(
      email: String!
      password: String!
    ): loginInfo!

    getUserRole(
      email: String!
    ): userRole!

    updateUserRole(
      email: String!
      role: String!
    ): updateRole!

    sendResetPasswordLink(
      email: String!
    ): resetMessage!
  }

  type userInfo {
    firstName: String!
    lastName: String!
    email: String!
    token: String!
    primaryLanguageId: Int!
    isVerified: Boolean!
    isGuest: Boolean!
  }

  type loginInfo {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    profileImage: String
    role: String!
    isVerified: Boolean!
    isGuest: Boolean!
    primaryLanguageId: String!
    token: String!
  }

  type userRole {
    userEmail: String!
    userRole: String!
  }

  type updateRole {
    message: String!
    userEmail: String!
    userRole: String!
  }
  type resetMessage {
    message: String!
  }
  type Subscription {
    newUser: userInfo!
  }
`;

