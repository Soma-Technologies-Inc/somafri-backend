import axios from "axios";
import response from "../helpers/response";
import CoursesServices from "../services/courses.services";

class RootCoursesController {
  static async addCoursesFromTranslate(req, res) {
    try {
        const {languageKey, languageId} = req.body;
        const key ='en';
        const rootCourses = await CoursesServices.getRootCourses();
        rootCourses.map(async(rootCourseData,index)=>{
            const text = rootCourses[index].dataValues.name
            const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${key}&tl=${languageKey}&dt=t&q=${text}`);
            const data={
              name:response.data[0][0][0],
              languageId, 
              rootCourseId:rootCourses[index].dataValues.id
            }
          await CoursesServices.createCourses(data);
        });

        return response.successMessage(
          res,
          'Courses was created successfully',
          201,
        );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}

export default RootCoursesController;
