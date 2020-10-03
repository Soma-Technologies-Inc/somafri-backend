import db from "../database/models";
import {
  ForbiddenError,
  UserInputError,
  AuthenticationError,
} from "apollo-server";

const countryResolvers = {

    Query: {
        getCountries: async (root, args, context) => {
          const user = await context.user;
          if (user === null) {
            throw new ForbiddenError("Please provide token first");
          }
          try {
            const countries = await db.country.findAndCountAll({
                order: [['createdAt', 'ASC']],
              });

              if (!countries) {
                  throw new ForbiddenError(" no language found");
                }
                return countries;
          } catch (e) {
            throw new ForbiddenError(`${e.message}`);
          }
        },
    }    
}

export default countryResolvers