import axios from 'axios';

const API_URL = 'http://localhost:10000/graphql';
export const me = async token =>
  await axios.post(
    API_URL,
    {
      query: `
        {
          me {
            id
            email
            firstName
          }
        }
      `,
    },
    token
      ? {
          headers: {
            'auth': token,
          },
        }
      : null,
  );

export const createUser = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $email: String!
        $firstName: String!
        $lastName: String
        $isVerified: Boolean!
      ) {
        createUser(
          email: $email,
          fistName: $fistName,
          lastName: $lastName,
          isVerified: $isVerified

        ) {
          token
        }
      }
    `,
    variables,
  });


