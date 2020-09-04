import response from '../helpers/response';
import CoursesServices from '../services/courses';

/**
 * Class for courses
 */
class CoursesMiddleware {
  static async findIfLanguageExist(req, res, next) {
    const { languageId } = req.body;
    const language = await CoursesServices.findIfLanguageExist(languageId);
    if (language === null) {
      return response.errorMessage(res, 'The language doesnt exist', 404);
    }
    return next();
  }

  static async findIfLevelExist(req, res, next) {
    const { levelId } = req.body;
    const level = await CoursesServices.findIfLevelExist(levelId);
    if (level === null) {
      return response.errorMessage(res, 'The level doesnt exist', 404);
    }
    return next();
  }

  static async findIfRootCourseExist(req, res, next) {
    const { rootCourseId } = req.body;
    const rootCourse = await CoursesServices.findIfRootCourseExist(
      rootCourseId,
    );
    if (rootCourse === null) {
      return response.errorMessage(res, 'The root course doesnt exist', 404);
    }
    return next();
  }
}
export default CoursesMiddleware;
