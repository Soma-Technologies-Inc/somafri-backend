import jwt from "jsonwebtoken";
import db from "../database/models";

class verifyTokens {
  static verifyAllTokens = async (token) => {
    if (token !== "") {
      const decodedToken = jwt.verify(token, process.env.JWTKEY);
      const user = await db.user.findOne({
        where: { email: decodedToken.payload.email },
      });
      
      return user.dataValues;
    }
    return null;
  };
}
export default verifyTokens;
