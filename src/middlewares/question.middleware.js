import response from '../helpers/response';
import QuestionServices from '../services/questions';

/**
 * Class for questions
 */
class QuestionMiddleware {
  static async checkIfRootCourseExist(req, res, next) {
    const { rootCourseId } = req.body;
    const rootCourse = await QuestionServices.checkIfRootCourseExist(rootCourseId);
    if (rootCourse === null) {
      return response.errorMessage(res, 'The root course doesnt exist', 404);
    }
    return next();
  }

  static async checkIfRootQuestionExist(req, res, next) {
    const { rootQuestionId } = req.body;
    const rootQuestion = await QuestionServices.checkIfRootQuestionExist(rootQuestionId);
    if (rootQuestion === null) {
      return response.errorMessage(res, 'The root question doesnt exist', 404);
    }
    return next();
  }
}
export default QuestionMiddleware;
