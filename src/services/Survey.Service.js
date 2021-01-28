import models from "../database/models";

const { Survey } = models;

/**
 * This a class dealing with survey
 */
class SurveyService {
  /**
   * @param {object} Survey
   * @returns {object} create a Survey object
   */
  static createSurvey = (survey) => Survey.create(survey);

  /**
   *
   * @param {object} survey
   * @returns {object} returns all surveys
   */
  static getAllSurvey = (survey) => Survey.findAll({ where: survey });

  static findSurveyByAttribute = (attribute) => {
    return Survey.findOne({ where: attribute });
  };
}

export default SurveyService;
