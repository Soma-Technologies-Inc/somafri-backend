import { expect } from 'chai';
import * as userApi from './api';

describe('Create user', () => {
  it('user creating account', async () => {
    // sign up

    let {
      data: {
        data: {
          createUser: { token },
        },
      },
    } = await userApi.createUser({
      email:"benny.ogidan@benny.com",
      firstName:"RUKUNDO", 
      lastName:"thomas",
      isVerified:true
      
    });
    console.log('==-=-=-=-=->>');

    const {
      data: {
        data: { me },
      },
    } = await userApi.me(token);
    // expect(me).to.eql({
    //   id: '3',
    //   email:"benny.ogidan@benny.com",
    //   firstName:"RUKUNDO", 
    //   lastName:"thomas",
    //   isVerified:true
    // });




  });
});
