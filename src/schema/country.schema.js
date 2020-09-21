import { gql } from "apollo-server-express";

export default gql`
scalar Date
  type country {
    id: Int
    name: String
    flag: String
    createdAt: Date
    updatedAt: Date
  }
  type getCountries {
    count: Int
    rows: [country]
  }

  extend type Query {
    getCountries: getCountries
  }
`;
