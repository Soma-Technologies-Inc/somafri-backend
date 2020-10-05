import axios from "axios";
import response from "../helpers/response";
import ContentsServices from "../services/contents.service";

class ContentsController{
static async addContentsFromTranslate(req, res){
try {
    const {languageKey, languageId} = req.body;
    const key ='en';
    const rootContents = await ContentsServices.getRootContents();
    rootContents.map(async(rootContentsData,index)=>{
        const text = rootContents[index].dataValues.content
        const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${key}&tl=${languageKey}&dt=t&q=${text}`);
        const audioText =response.data[0][0][0].split(" ").join("");
        const data={
          content:response.data[0][0][0],
          languageId, 
          rootContentId:rootContents[index].dataValues.id,
          contentAudio:`http://translate.google.com.vn/translate_tts?ie=UTF-8&q=${audioText}+&tl=${languageKey}&client=tw-ob`
        }
      await ContentsServices.createContents(data);
    });

    return response.successMessage(
      res,
      'Contents were created successfully',
      201,
    );
} catch (error) {
 return response.errorMessage(res, error.message, 500);  
}

}
}

export default ContentsController;