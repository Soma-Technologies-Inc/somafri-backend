import models from "../database/models";

const { careers } = models;

/**
 * This a class dealing with careers
 */
class CareerService {
  /**
   * @param {object} career
   * @returns {object} create a career object
   */
  static createCareer = (career) => {
    return careers.create(career);
  };

  /**
   * @param {object} attribute
   * @returns {object} get all careers
   */
  static getCareersByAttribute = (attribute) => {
    return careers.findAll({ where: attribute });
  };

  static updateCareerByAttribute = (attribute, payload) => {
    return careers.update(payload, { where: attribute })
  }

  static findCareerByAttribute = (attribute) => {
    return careers.findOne({ where: attribute });
  };
}

export default CareerService;
