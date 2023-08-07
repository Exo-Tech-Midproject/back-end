"use strict"

require('dotenv').config();
const base64 = require('base-64')
const bcrypt = require('bcrypt')
const {app} = require('../src/server')
const supertest = require('supertest');
const req = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
    await db.sync();
  })

afterAll(async () => {
    
    await db.drop();
  })

  describe('testing the server', () => {

    

    it('POST to /signup/:model to create a new user.', async () => {
      const res = await req.post('/signup/physician').send({
        "username": "Hasan1",
        "password": "12asd31",
        "fullName": "HasaasdnTom111",
        "licenseId": 123444,
        "gender": "male",
        "birthDate": "1996-08-07",
        "mobileNumber": "13231",
        "emailAddress": "hasasdad1@gmail.com",
        "nationalID": "1asd",
        "department": "ENT"
      });

        
        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual('Hasan1')
        expect( await bcrypt.compare('12asd31',res.body.user.password)).toEqual(true)
  });
  it('POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes.', async () => {
    const res = await req
      .post('/login/physician')
      .set('Authorization', `Basic ${await base64.encode('Hasan1:12asd31')}` )
     
    
    // console.log(res.request._header.authorization); // Log the authorization header value
    expect(res.status).toBe(200); // since Jalal is in the database, the auth middleware will work fine and send 200 status code.
    expect(res.request._header.authorization).toBe('Basic SGFzYW4xOjEyYXNkMzE=');
    
  });

  })