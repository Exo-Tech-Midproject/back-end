'use strict'

const express = require('express');
const userRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic')
const bearerAuth = require('../../middleware/auth/bearer')

const { appointment } = require('../../models/index')
const modelMiddleware = require('../../middleware/routerModelling/routerModelling')

userRouter.param('model', modelMiddleware);

userRouter.get('/login', (req, res, next) => {
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
            "maritalStatus": "Your maritalStatus as single/married",
            "mobileNumber": "Your mobile Number",
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

userRouter.get('/:model/secret', bearerAuth, async (req, res, next) => {
    let users = await req.model.get()
    res.status(200).json(users)
});


userRouter.get('/profile/:model/:username', async (req, res) => {

    const username = req.params.username;
    // console.log(username)
    console.log(req.model.model)

    const userProfile = await req.model.getByUN(username);

    if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json(userProfile);
    }

});

userRouter.put('/profile/:model/:username', async (req, res) => {
    const username = req.params.username;
    const obj = req.body;

    let updateProfile = await req.model.updateByUN(username, obj);

    if (!updateProfile) {
        return res.status(404).json({ error: 'Access denied' });
    } else {
        res.status(200).json(updateProfile);
    }
});



userRouter.get('/', async (req, res, next) => {
    res.status(200).json("Welcome to Home Page")
})

userRouter.get('/signup', (req, res) => {
    const welcomeMessage = `
    Welcome to the Signup Page!<br><br>
    To sign up as a patient, use: <strong>/signup/patient</strong><br>
    To sign up as a physician, use: <strong>/signup/physician</strong>
    `;
    res.send(welcomeMessage);

});
//-----------------------------------------------------------------------------
// Appointment Routes

//add Appointment
userRouter.post('/profile/:model/:username/appointments', async (req, res) => {

    const username = req.params.username;
    const user = await req.model.getByUN(username);

    console.log("model", req.params.model)

    if (req.params.model === 'physician') {
        let appointmentData = req.body;
        appointmentData.physicianUsername = req.params.username;

        const appointmentInfo = await appointment.create(appointmentData);
        const output = {
            appointmentInfo: appointmentInfo
        };
        return res.status(201).json(appointmentInfo);
    } else {
        return res.status(403).json({ error: 'Access denied' });
    }

});

//retrieve appointment
userRouter.get('/profile/:model/:username/appointments', bearerAuth, async (req, res) => {
    const username = req.params.username;
    console.log("req.user.params = ", req.user.username)
    if (req.user.username !== username) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const user = await req.model.getByUN(username);

    const appointments = await appointment.model.findAll({ where: { physicianUsername: username } })

    return res.status(200).json(appointments);

});

module.exports = userRouter;