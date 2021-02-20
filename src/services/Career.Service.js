import models from '../database/models';

const { careers } = models;

/**
 * This a class dealing with careers
 */
class CareerService {
  /**
   * @param {object} career
   * @returns {object} create a career object
   */
  static createCareer = (career) => careers.create(career);

  /**
   * @param {object} attribute
   * @returns {object} get all careers
   */
  static getCareersByAttribute = (attribute) => careers.findAll({ where: attribute });

  static updateCareerByAttribute = (attribute, payload) => careers.update(payload, { where: attribute })

  static findCareerByAttribute = (attribute) => careers.findOne({ where: attribute });
}

export default CareerService;
