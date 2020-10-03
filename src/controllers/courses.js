import CoursesServices from '../services/courses';
import TrackCourse from '../services/trackCourse';
import response from '../helpers/response';


class CoursesController {
  static async addTestResult(req, res) {
    const userId = req.user.id;
    const { languageId, courseId } = req.params;
    const { testResult } = req.body;
    const savingResult = await TrackCourse.saveTestResult(
      userId,
      courseId,
      languageId,
      testResult,
    );
    return response.successMessage(
      res,
      ' test result saved successfully',
      200,
      testResult,
    );
  }

  static async createRootCourses(req, res) {
    try {
      const courseIcon = req.file.location;
      const {
        name, languageId, levelId, complexity,
      } = req.body;
      const data = {
        name,
        languageId,
        levelId,
        complexity,
        courseIcon,
      };

      if (isNaN(complexity)) {
        return response.errorMessage(res, 'complexity must be an integer', 400);
      }

      const rootCourses = await CoursesServices.createRootCourses(data);
      return response.successMessage(
        res,
        'root course created successfully',
        201,
        rootCourses,
      );
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }

  static async createCourses(req, res) {
    try {
      const { name, languageId, rootCourseId } = req.body;
      const data = {
        name,
        languageId,
        rootCourseId,
      };

      const courses = await CoursesServices.createCourses(data);
      return response.successMessage(
        res,
        'Course created successfully',
        201,
        courses,
      );
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }
}
export default CoursesController;
