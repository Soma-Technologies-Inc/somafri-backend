import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../index';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import EncryptPassword from '../helpers/Encryptor';
import mockData from './data/musicData';


const { expect } = chai;


dotenv.config();

chai.use(chaiHttp);
chai.should();

let token;
let token2;
const token3 = GenerateToken({ email: 'shemad24@gmail.com', isVerified: true, id: 7 , role:'admin' });

/**
 * @param {String} tokens
 * @returns {Object} JWT
 */
function verifyToken(tokens) {
  return jwt.verify(tokens, process.env.JWTKEY, (_err, data) => data);
}

describe('Musics tests', () => {
  const { trip, returnTrip } = tripsData;

  before(async () => {
    const user = await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shemad@gmail.com',
      gender: 'male',
      password: EncryptPassword('soma1234@'),
      role: 'admin'
    });
    token = GenerateToken({ email: 'shemadd@gmail.com', isVerified: false, role:'admin' });
})

  it('should create a music when account', (done) => {
    chai.request(app).post('/soma/music')
      .set('token', `Bearer ${token}`)
      .send(mockData[0])
      .end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.message).to.eq('Account not verified');
        done();
      });
  });
});
