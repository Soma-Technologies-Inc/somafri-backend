import db from "../database/models";
import Queries from './Queries';

class AddCoursesServices {
  static async getRootCourses() {
    try {
      const rootCourses = await db.rootCourse.findAll({
        include: [
          {
            model: db.language,
          },
        ],
      });
      return rootCourses;
    } catch (error) {
      return error;
    }
  }

  static async createCourses(data) {
    return Queries.create(db.course, data);
  }
}

export default AddCoursesServices;
