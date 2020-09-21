import db from '../database/models';
import Queries from './Queries';

class CountryServices {
  static async CreateCountry(data) {
    return Queries.create(db.country, data);
  }

  static async getCountries() {
    try {
      const searchCountry = await db.country.findAndCountAll({
        attributes: ['id', 'name', 'flag', 'createdAt'],
        order: [['createdAt', 'ASC']],
      });
      if (!searchCountry) return null;
      return searchCountry;
    } catch (error) {
      return undefined;
    }
  }

  static async findCountry(country) {
    try {
      return await db.country.findOne({
        where: { name: country },
      });
    } catch (error) {
      return null;
    }
  }

  static async findCountryById(id) {
    try {
      return await db.country.findOne({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
export default CountryServices;
