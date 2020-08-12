import { emit } from 'nodemon';
import db from '../database/models';

class UserServices {

  static async findUserByEmail(email) {
    try {
      const user = await db.user.findOne({ where: { email } });

      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }

  
}
export default UserServices;
