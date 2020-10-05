import db from "../database/models";
import Queries from './Queries';

class AddContentsServices {
  static async getRootContents() {
    try {
      const rootContents= await db.rootContent.findAll();
      return rootContents;
    } catch (error) {
      return error;
    }
  }

  static async createContents(data) {
    return Queries.create(db.content, data);
  }
}

export default AddContentsServices;
