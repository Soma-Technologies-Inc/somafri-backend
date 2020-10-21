import response from "../helpers/response";
import axios from "axios"; 
import TranslationService from "../services/translation.service";

class Translate {
  static async translateWords(req, res) {
    try {
      const { message, from, to } = req.body;
      const userId = req.user.id;
      const response = await axios.get(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from.key}&tl=${to.key}&dt=t&q=${message}`
      );
      const data = {
        question: message,
        answer: response.data[0][0][0],
        from:from.name,
        to:to.name,
        userId,
      };
     const saveTranslate= await TranslationService.create(data);
      const responseData = [
        {
          translationId:saveTranslate.id,
          BeforeTranslation: {
            language: from.name,
            text: message,
          },
          AfterTranslation: {
            language: to.name,
            text: response.data[0][0][0],
          },
        },
      ];

      res.status(201).send({
        message: "translation successfully",
        data: responseData,
      });
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}

export default Translate;
