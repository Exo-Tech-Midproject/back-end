'use strict'

const express = require('express');
const generalRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic')
const bearerAuth = require('../../middleware/auth/bearer')

const { group , physician , patient, appointment} = require('../../models')

generalRouter.get('/', homePageHandler)
generalRouter.get('/login', logInPageHandler)
generalRouter.get('/signup',signUpPageHandler);


//------------------------------------------------------------------------------------------

//Routes Functions:

async function homePageHandler (req, res, next){
    res.status(200).json("Welcome to Home Page")
}
async function signUpPageHandler (req, res, next){
    const welcomeMessage = `
    Welcome to the Signup Page!
    To sign up as a patient, use: /signup/patient
    To sign up as a physician, use: /signup/physician`;
    res.send(welcomeMessage);
}

async function logInPageHandler(req, res, next){
    const response = {
        message: "pass your account type you want to login as a param into the url as /physician or /patient then send a post request with your information as shown below format",
        forPhysician: {
            "username": "Your Username",
            "fullName": "Your fullname",
            "password": "Yourpassword",
            "licenseId": "Your licenseID",
            "gender": "Your gender (male/female)",
            "birthDate": "Your birthday as (Year-month-day)",
            "mobileNumber": "Your mobile Number",
            "emailAddress": "Your Email",
            "nationalID": "Your National ID",
            "department": "The department you work in"
        },
        forPatient: {
            "username": "Your Username",
            "fullName": "Your fullname",
            "password": "Yourpassword",
            "gender": "Your gender (male/female)",
            "birthdate": "Your birthday as (Year-month-day)",
            "race": "Your race as hispanic', 'non-hispanic', 'asian', 'african-american', 'american-indian', 'white', 'native-hawaiian",

            "maritalStatus":"Your maritalStatus as single/married" ,
            "mobileNumber":"Your mobile Number" ,
            "emailAddress": "Your Email"   
        }
        

    }

    res.status(200).json(response);
};


module.exports = generalRouter;

