import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('App Tests', () => {
  it('should not return the homepage', (done) => {
    chai.request(app).get('/')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
