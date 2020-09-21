import CountryServices from '../services/country';
import response from '../helpers/response';

class CountryController {
  static async addCountry(req, res) {
    try {
      req.body.flag = req.file.location;
      const { name, flag } = req.body;
      const findCountry = await CountryServices.findCountry(name);

      if (findCountry) {
        return response.errorMessage(res, 'country already registered', 409);
      }
      CountryServices.CreateCountry(req.body);
      return response.successMessage(res, 'Country saved successfull', 200, { name, flag });
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }
}
export default CountryController;
