import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import env from "dotenv";
import app from '../index'
import mockData from "./mockData";

env.config();

chai.use(chaiHttp);
chai.should();

const userTest = () => {
  describe("user controller.(POST) ", () => {
    it("it should return 200 when user is successfully logged out", (done) => {
      const Signed = mockData.adminUser;
      const Token = jwt.sign(Signed, process.env.JWTKEY, {
        expiresIn: "24h",
      });
      chai
        .request(app)
        .patch(`/soma/auth/logout`)
        .set("token", `Bearer ${Token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
};

export default userTest;
