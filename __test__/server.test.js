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
        "username": "Taasnbbnmeem",
        "password": "1245567899",
        "fullName": "Tas58eemhassasneh",
        "licenseId": 1122555354753,
        "gender": "female",
        "birthday": "1996-08-07",
        "mobileNumber": "+965478855866690",
        "emailAddress": "eemhassasneh@gmail.com",
        "nationalID": "7885423853",
        "department": "rewer"
      });

        
        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual('taasnbbnmeem')
        expect( await bcrypt.compare('1245567899',res.body.user.password)).toEqual(true)
  });
  it('POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes.', async () => {
    const res = await req
      .post('/login/physician')
      .set('Authorization', `Basic ${await base64.encode('taasnbbnmeem:1245567899')}` )
     
    
    // console.log(res.request._header.authorization); // Log the authorization header value
    expect(res.status).toBe(200); // since Jalal is in the database, the auth middleware will work fine and send 200 status code.
    expect(res.request._header.authorization).toBe('Basic dGFhc25iYm5tZWVtOjEyNDU1Njc4OTk=');
    
  });

  })