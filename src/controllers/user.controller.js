import db from '../database/models';

class UserController {
  static async createUser(
    root,
    {
      email, firstName, lastName, isVerified,
    },
    { models },
  ) {
    return db.user.create({
      email,
      firstName,
      lastName,
      isVerified,
    });
  }
}

export default UserController;
