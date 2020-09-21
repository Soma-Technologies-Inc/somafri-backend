import response from '../helpers/response';
import LanguageService from '../services/language';

/**
 * Class for courses
 */
class LanguagesMiddleware {
  static async checkIfLanguageExist(req, res, next) {
    const languageToEnroll = req.body.language;

    if (languageToEnroll === 'English') {
      return response.errorMessage(res, 'The language doesnt exist please unroll to another language', 404);
    }
    const language = await LanguageService.findLanguage(languageToEnroll);

    if (language === null) {
      return response.errorMessage(res, 'The language doesnt exist', 404);
    }
    req.language = language.dataValues;
    return next();
  }

  static async checkIfUserAlreadyEnrolled(req, res, next) {
    const languageId = req.language.id;
    const userId = req.user.id;
    const enrolledLanguage = await LanguageService.checkIfUserAlreadyEnrolled(languageId, userId);
    if (enrolledLanguage) {
      return response.errorMessage(res, 'You already enrolled to that language', 409);
    }
    return next();
  }
}
export default LanguagesMiddleware;
