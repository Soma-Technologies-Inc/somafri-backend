// import { expect } from 'chai';
// import * as userApi from './api';

// describe('Create user', () => {
//   it('user creating account', async () => {
//     // sign up

//     let {
//       data: {
//         data: {
//           createUser: { token },
//         },
//       },
//     } = await userApi.createUser({
//       email:"benny.ogidan@benny.com",
//       firstName:"RUKUNDO", 
//       lastName:"thomas",
//       isVerified:true
      
//     });
//     // const token = 'eooweornfnwiiiei123wefinsdnf'
//     const {
//       data: {
//         data: { me },
//       },
//     } = await userApi.me(token);
//     console.log('==-=-=-=-=->>', me);
//     expect(me).to.eql({
//       id: '3',
//       email:"benny.ogidan@benny.com",
//       firstName:"RUKUNDO", 
//       lastName:"thomas",
//       isVerified:true
//     });




//   });
// });

const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:8000`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Create user', (done) => {
        
        request.post('/graphql')
        .send( 'mutation{ createUser(email:"benny.ogidan@benny.com",firstName:"RUKUNDO",lastName:"thomas",isVerified:true) { token } }')
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            // res.body.should.have.property('token')
            done();
        })
    })

});