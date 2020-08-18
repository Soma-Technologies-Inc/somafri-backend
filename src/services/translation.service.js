import db from '../database/models';
class TranslationService{

      /**
     * creating user query
     * @param {string} table users table in database.
     * @param {string} data the data to be inputed in database.
     * @returns {array} data the data to be returned.
     */
    static async create( data) {
        try {
          const datas = await db.translation.create(data);
          return datas;
        } catch (error) {
          return error;
        }
      }
    
      
    
}

export default TranslationService;