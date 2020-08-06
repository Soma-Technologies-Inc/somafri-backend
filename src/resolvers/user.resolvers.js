import db from '../database/models';
import UserController from '../controllers/user.controller';

const UserResolvers = {
  Query: {
    async getUsers() {
      return db.user.findAll();
    },
  },
  Mutation: {
    signup: UserController.createUser(),
  },
};

module.exports = UserResolvers;
