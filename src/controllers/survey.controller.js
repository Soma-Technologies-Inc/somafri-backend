import response from "../helpers/response";
import SurveyService from "../services/Survey.Service";

class SurveyController {

  static createSurvey = async (req, res) => {
    const userSubmittedSurvey = await SurveyService.findSurveyByAttribute({
      userId: req.user.dataValues.id,
    });
    if (userSubmittedSurvey !== null) {
        debugger;
    } else {
      const createdSurvey = await SurveyService.createSurvey({
        userId: req.user.dataValues.id,
        dailyGoal: req.body.dailyGoal,
        whereUserHeardUs: req.body.whereUserHeardUs,
        purposeOfLearning: req.body.purposeOfLearning,
      });

      return response.successMessage(
        res,
        "Survey submitted successfull",
        201,
        createdSurvey
      );
    }
      return response.errorMessage(
        res,
        "User already submitted survey",
        422
      );
  };

  static retrieveAllSurveys = async (req, res) => {
    const retrievedSurveys = await SurveyService.getAllSurvey({
      submitted: true,
    });
    return response.successMessage(
      res,
      "Surveys retrieved successfully",
      200,
      retrievedSurveys
    );
  };
}

export default SurveyController;
