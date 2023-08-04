'use strict'

const express = require('express');
const userRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic')
const bearerAuth = require('../../middleware/auth/bearer')

const models = require('../../models/index')
const modelMiddleware = require('../../middleware/routerModelling/routerModelling')

userRouter.param('model', modelMiddleware);

userRouter.get('/login', (req, res, next) => {
    const response = {
        message: "pass your account type you want to login as a param into the url as /physician or /patient then send a post request with your information as shown below format",
        forPhysician: {
            "username":"Your Username",
            "fullName":"Your fullname",
            "password":"Yourpassword",
            "licenseId":"Your licenseID",
            "gender":"Your gender (male/female)",
            "birthDate":"Your birthday as (Year-month-day)",
            "mobileNumber":"Your mobile Number",
            "emailAddress":"Your Email",
            "nationalID":"Your National ID",
            "department":"The department you work in"
        },
        forPatient: {
            "username": "Your Username",
            "fullName": "Your fullname",
            "password": "Yourpassword",
            "gender": "Your gender (male/female)",
            "birthdate":"Your birthday as (Year-month-day)" ,
            "race": "Your race as hispanic', 'non-hispanic', 'asian', 'african-american', 'american-indian', 'white', 'native-hawaiian",
            "maritalStatus":"Your maritalStatus as single/married" ,
            "mobileNumber":"Your mobile Number" ,
            "emailAddress": "Your Email"   
          }
        
    }
    
    res.status(200).json(response);
});

userRouter.post('/signup/:model', async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
    let user = await req.model.create(req.body);
    const output = {
        user: user,
        token: user.token
    };
    res.status(201).json(output);
    } catch (e) {
    next(e.message)
    }
});

userRouter.post('/login/:model', basicAuth, (req, res, next) => {
    const user = {
        user: req.user,
        token: req.user.token
    };
    res.status(200).json(user);
});

userRouter.get('/:model/secret',bearerAuth, async (req, res, next) => {
    let users = await req.model.get()
    res.status(200).json(users)
});

userRouter.get('/signup', (req, res) => {
    const welcomeMessage = `
    Welcome to the Signup Page!<br><br>
    To sign up as a patient, use: <strong>/signup/patient</strong><br>
    To sign up as a physician, use: <strong>/signup/physician</strong>
    `;
    res.send(welcomeMessage);
});
module.exports = userRouter;