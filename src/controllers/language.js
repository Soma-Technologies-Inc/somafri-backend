import LanguageServices from '../services/language';
import CoursesServices from '../services/courses';
import CountryServices from '../services/country';
import response from '../helpers/response';
import LanguageHelper from '../helpers/languages.helper';
import UserServices from '../services/users';
import verifyToken from '../middlewares/verifyToken';

class LanguageController {
  static async addLanguage(req, res) {
    try {
      const { name, country, duplicatedLanguageId } = req.body;
      const findCountry = await CountryServices.findCountry(country);
      if (!findCountry) {
        return response.errorMessage(res, 'Country not registered', 404);
      }
      const { id } = findCountry;
      const findLanguage = await LanguageServices.findLanguage(name);
      if (duplicatedLanguageId !== undefined) {
        const findLanguage = await LanguageServices.getLanguage(duplicatedLanguageId);
        if (findLanguage === null) {
          return response.errorMessage(res, 'duplication language does not exist not registered', 404);
        }
      }
      if (findLanguage) {
        return response.errorMessage(res, 'Language already registered', 409);
      }
      const addLanguage = {
        name,
        countryId: id,
        duplicatedLanguageId,
      };
      LanguageServices.CreateLanguage(addLanguage);
      const data = {
        name,
        country,
        duplicatedLanguageId,
      };
      return response.successMessage(
        res,
        'Language saved successfully',
        200,
        data,
        duplicatedLanguageId,
      );
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }

}

export default LanguageController;
