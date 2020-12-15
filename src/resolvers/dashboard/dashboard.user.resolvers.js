import {
  ForbiddenError,
  UserInputError,
  AuthenticationError,
} from "apollo-server";

import Paginate from "../../helpers/paginate";
import UserServices from '../../services/users'
import dashboardUserServices from "../../services/dashboard/dashboard.user";

const dashboardUserResolvers = {
  Query: {
    getAllUsers: async (root, { page }, context, args) => {
      const limit = 15;
      const offset = Paginate(page, limit);

      try {
        const user = await context.user;
        if (!user) {
          throw new AuthenticationError("Please provide token first");
        }
        if (user.role !== "admin") {
          throw new ForbiddenError(
            "you are not authorized to perform this task."
          );
        }
        const usersList = await dashboardUserServices.getUsers(limit, offset);
        if (usersList.length > 0) {
          return usersList;
        }
        throw new ForbiddenError("No registered user yet");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
    activateDeactivate: async (root, { userId:id }, context, args) => {
      try {
        const user = await context.user;
        if (!user) {
          throw new AuthenticationError("Please provide token first");
        }
        if (user.role !== "admin") {
          throw new ForbiddenError(
            "you are not authorized to perform this task."
          );
        }
        const findUser = await UserServices.findUser(id);
        const { status } = findUser;
        const activateDeactivate = await dashboardUserServices.activateDeactivate(id, !status);
        if (!activateDeactivate) {
          throw new UserInputError(
            "something went wrong try again."
          );
        }
        if(status){
          return 'account deactivated successfully';

        }
        return 'account activated successfully';
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

    changeRole: async (root, { userId:id, newRole }, context, args) => {
      try {
        const user = await context.user;
        if (!user) {
          throw new AuthenticationError("Please provide token first");
        }
        if (user.role !== "superAdmin") {
          throw new ForbiddenError(
            "you are not authorized to perform this task."
          );
        }
        const findUser = await UserServices.findUser(id);

        if (!findUser) {
          throw new UserInputError(
            "user not found"
          );
        }
        const updateRole = await dashboardUserServices.updateRole(id, newRole)
        const updatedUser = await UserServices.findUser(id);
        if(!updateRole){
          throw new UserInputError(
            "something went wrong please check the new Role and try again"
          );
        }
        return updatedUser;
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

    activateAccounts: async (root, args, context) => {
      try {
        const user = await context.user;
        if (!user) {
          throw new AuthenticationError("Please provide token first");
        }
        if (user.role !== "admin") {
          throw new ForbiddenError(
            "you are not authorized to perform this task."
          );
        }
        const usersList = await UserServices.countUsers();        
        const activateAccounts =  await Promise.all(
          usersList.rows.map(async (user, index) => {
            const { id } = user;
            await dashboardUserServices.activateDeactivate(id, true);
          })
        );

        if (!activateAccounts) {
          throw new UserInputError(
            "something went wrong try again."
          );
        }
        return 'accounts activated successfully';
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

  },
};

module.exports = dashboardUserResolvers;
