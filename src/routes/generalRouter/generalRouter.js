'use strict'

const express = require('express');
const generalRouter = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bearerAuthPatient = require('../../middleware/auth/bearerPatient')
const bearerAuthphysician = require('../../middleware/auth/bearerPhysician')


//-------------------- new work
// const io = require('socket.io')(3000)
// const http = require('http')

//----------------------------
// resetToken generator function
function generateResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    return resetToken;
}
// nodemailer Email sender function
async function sendResetEmail(emailAddress, resetToken) {
    const transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            user: 'projectTest14200@gmail.com',
            pass: 'emfcekcmuudyhwyh',
            // password @aaa1234
        },
    });

    const mailOptions = {
        from: 'projectTest1420@gmail.com',
        to: emailAddress,
        subject: 'Password Reset',
        text: `Use this token to reset your password: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
}


const { group, physician, patient, appointment, rating } = require('../../models');
const path = require('path');

generalRouter.get('/', homePageHandler)
generalRouter.get('/patient/:username/chat', bearerAuthPatient, chatPageHandler)
generalRouter.get('/patient/:username/chat/with/:targetchat', bearerAuthPatient, targetedChatpage)
generalRouter.get('/physician/:username/chat', bearerAuthphysician, chatPageHandlerPhys)
generalRouter.get('/physician/:username/chat/with/:targetchat', bearerAuthphysician, targetedChatpagePhys)
generalRouter.get('/patient/login', logInPageHandlerPatient)
generalRouter.get('/physician/login', logInPageHandlerPhysician)
generalRouter.get('/signup', signUpPageHandler);
generalRouter.post('/patient/forgotpassword/:username', handleForgotPasswordPatient)
generalRouter.post('/physician/forgotpassword/:username', handleForgotPasswordPhysician)
generalRouter.post('/patient/resetpassword/:username', handleResetPasswordPatient)
generalRouter.post('/physician/resetpassword/:username', handleResetPasswordPhysician)
generalRouter.get('/allpatients', handleGetAllPatients)
generalRouter.get('/allphysicians', handleGetAllPhysicians)
generalRouter.get('/allpatients/:username', handleGetOnePatient)
generalRouter.get('/allphysicians/:username', handleGetOnePhysician)


//------------------------------------------------------------------------------------------

//Routes Functions:

async function homePageHandler(req, res, next) {
    res.status(200).json("Welcome to Home Page")
}

//--- chat test Hasan
async function chatPageHandler(req, res, next) {
    const chatHtmlPath = path.join(__dirname, '..', '..', '..', 'ChooseChat', 'picktochat.html');
    res.sendFile(chatHtmlPath)

}
async function targetedChatpage(req, res, next) {
    const chatHtmlPath = path.join(__dirname, '..', '..', '..', 'chatHtml', 'chat.html');
    res.sendFile(chatHtmlPath)

}
async function chatPageHandlerPhys(req, res, next) {
    const chatHtmlPath = path.join(__dirname, '..', '..', '..', 'ChooseChat', 'picktoChatPhys.html');
    res.sendFile(chatHtmlPath)

}
async function targetedChatpagePhys(req, res, next) {
    const chatHtmlPath = path.join(__dirname, '..', '..', '..', 'chatHtml', 'chatPhys.html');
    res.sendFile(chatHtmlPath)

}
//--- chat test Hasan

async function signUpPageHandler(req, res, next) {
    const welcomeMessage = `
    Welcome to the Signup Page!
    To sign up as a patient, use: /signup/patient
    To sign up as a physician, use: /signup/physician`;
    res.send(welcomeMessage);
}

async function logInPageHandlerPatient(req, res, next) {
    // const response = {
    //     message: "pass your account type you want to login as a param into the url as /physician or /patient then send a post request with your information as shown below format",
    //     forPhysician: {
    //         "username": "Your Username",
    //         "fullName": "Your fullname",
    //         "password": "Yourpassword",
    //         "licenseId": "Your licenseID",
    //         "gender": "Your gender (male/female)",
    //         "birthDate": "Your birthday as (Year-month-day)",
    //         "mobileNumber": "Your mobile Number",
    //         "emailAddress": "Your Email",
    //         "nationalID": "Your National ID",
    //         "department": "The department you work in"
    //     },
    //     forPatient: {
    //         "username": "Your Username",
    //         "fullName": "Your fullname",
    //         "password": "Yourpassword",
    //         "gender": "Your gender (male/female)",
    //         "birthdate": "Your birthday as (Year-month-day)",
    //         "race": "Your race as hispanic', 'non-hispanic', 'asian', 'african-american', 'american-indian', 'white', 'native-hawaiian",

    //         "maritalStatus":"Your maritalStatus as single/married" ,
    //         "mobileNumber":"Your mobile Number" ,
    //         "emailAddress": "Your Email"   
    //     }


    // }

    // res.status(200).json(response);

    //-------------- new work 
    const chatHtmlPath = path.join(__dirname, '..', '..', '..', 'login', 'login.html');
    res.sendFile(chatHtmlPath)
};
async function logInPageHandlerPhysician(req, res, next) {
    // const response = {
    //     message: "pass your account type you want to login as a param into the url as /physician or /patient then send a post request with your information as shown below format",
    //     forPhysician: {
    // "username": "Your Username",
    // "fullName": "Your fullname",
    // "password": "Yourpassword",
    // "licenseId": "Your licenseID",
    // "gender": "Your gender (male/female)",
    // "birthDate": "Your birthday as (Year-month-day)",
    // "mobileNumber": "Your mobile Number",
    // "emailAddress": "Your Email",
    // "nationalID": "Your National ID",
    // "department": "The department you work in"
    //     },
    //     forPatient: {
    // "username": "Your Username",
    // "fullName": "Your fullname",
    // "password": "Yourpassword",
    // "gender": "Your gender (male/female)",
    // "birthdate": "Your birthday as (Year-month-day)",
    // "race": "Your race as hispanic', 'non-hispanic', 'asian', 'african-american', 'american-indian', 'white', 'native-hawaiian",

    // "maritalStatus":"Your maritalStatus as single/married" ,
    // "mobileNumber":"Your mobile Number" ,
    // "emailAddress": "Your Email"   
    //     }


    // }

    // res.status(200).json(response);

    //-------------- new work 
    const chatHtmlPath = path.join(__dirname, '..', '..', '..', 'login', 'loginPhys.html');
    res.sendFile(chatHtmlPath)
};


async function handleForgotPasswordPatient(req, res, next) {
    try {

        const username = req.params.username;
        const { emailAddress } = req.body;

        const user = await patient.getByUN(username);
        //console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", user)

        if (!user) throw new Error(`user doesn't exist`)


        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        let obj = {
            resetToken: resetToken
        }
        let savedData = await patient.updateByUN(username, obj);

        //console.log('resetToken', user.resetToken)


        sendResetEmail(emailAddress, resetToken);

        res.status(200).json({ message: 'Password reset email sent', obj });
    } catch (err) {
        next(err)
    }
};
async function handleForgotPasswordPhysician(req, res, next) {
    try {
        const username = req.params.username;
        const { emailAddress } = req.body;

        const user = await physician.getByUN(username);
        //console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", user)

        if (!user) throw new Error(`user doesn't exist`)


        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        let obj = {
            resetToken: resetToken
        }
        let savedData = await physician.updateByUN(username, obj);

        //console.log('resetToken', user.resetToken)


        sendResetEmail(emailAddress, resetToken);

        res.status(200).json({ message: 'Password reset email sent', obj });
    } catch (err) {
        next(err)
    }
};

async function handleResetPasswordPatient(req, res, next) {
    try {

        const username = req.params.username;
        const { resetToken, newPassword } = req.body;


        let hashedPass = await bcrypt.hash(newPassword, 10);
        // console.log(hashPassword, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvs")


        const user = await patient.getByUN(username);

        if (!user) {
            return res.status(404).json({ error: 'Invalid user' });
        }
        // console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrr')
        // console.log("zzzzzzzzzzzzzzzzzzzzzzz", user.resetToken)
        if (user.resetToken !== resetToken) {
            return res.status(400).json({ error: 'Invalid reset token' });
        }

        // user.password = newPassword;

        // console.log(user.password,'pppppppppppppppppppppppppass')
        let obj = {
            resetToken: "",
            password: hashedPass
        }; // Remove the reset token

        let savedData = await patient.updateByUN(username, obj);
        const userAfter = await patient.getByUN(username);
        // console.log(userAfter, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        res.status(200).json({ message: 'Password reset successfully', obj });
    } catch (err) {
        next(err)
    }

}
async function handleResetPasswordPhysician(req, res, next) {
    try {

        const username = req.params.username;
        const { resetToken, newPassword } = req.body;


        let hashedPass = await bcrypt.hash(newPassword, 10);
        // console.log(hashPassword, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvs")


        const user = await physician.getByUN(username);

        if (!user) {
            return res.status(404).json({ error: 'Invalid user' });
        }
        // console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrr')
        // console.log("zzzzzzzzzzzzzzzzzzzzzzz", user.resetToken)
        if (user.resetToken !== resetToken) {
            return res.status(400).json({ error: 'Invalid reset token' });
        }

        // user.password = newPassword;

        // console.log(user.password,'pppppppppppppppppppppppppass')
        let obj = {
            resetToken: "",
            password: hashedPass
        }; // Remove the reset token

        let savedData = await physician.updateByUN(username, obj);
        const userAfter = await physician.getByUN(username);
        // console.log(userAfter, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        res.status(200).json({ message: 'Password reset successfully', obj });
    } catch (err) {
        next(err)
    }

}

//---------------------------------------------------------- New Routes
async function handleGetAllPatients(req, res, next) {
    try {

        // const username = req.params.username;
        // console.log(username)

        const userProfile = await patient.model.findAll({
            attributes: ['fullName', 'insurance', 'gender', 'birthdate', 'maritalStatus', 'mobileNumber', 'emailAddress', 'race'],
        })
        // if (!userProfile) {
        //     return res.status(404).json({ error: 'User not found' });
        // } else {

        //     res.status(200).json(result);

        // }
        res.status(200).json(userProfile);
    } catch (err) {
        next(err)
    }
}
async function handleGetAllPhysicians(req, res, next) {
    try {
        const physicians = await physician.model.findAll({
            attributes: ['username', 'fullName', 'licenseId', 'gender', 'birthDate', 'mobileNumber', 'emailAddress', 'department', 'address', 'profileImg', 'coverImg'],
        });

        const physiciansWithAvgRating = await Promise.all(physicians.map(async (physician) => {
            const averageRating = await rating.model.calculateAverageRating(physician.username);
            return { ...physician.toJSON(), averageRating };
        }));

        res.status(200).json(physiciansWithAvgRating);
    } catch (err) {
        next(err);
    }
}
async function handleGetOnePatient(req, res, next) {
    try {
        const username = req.params.username;
        const userProfile = await patient.model.findOne({
            where: { username: username },
            attributes: ['fullName', 'insurance', 'gender', 'birthdate', 'maritalStatus', 'mobileNumber', 'emailAddress', 'race'],
        })
        if (!userProfile) throw new Error('user not found')
        res.status(200).json(userProfile);
    } catch (err) {
        next(err)
    }
}
async function handleGetOnePhysician(req, res, next) {
    try {
        const username = req.params.username;
        const userProfile = await physician.model.findOne({
            where: { username: username },
            attributes: ['fullName', 'licenseId', 'gender', 'birthDate', 'mobileNumber', 'emailAddress', 'department', 'address'],
        })
        if (!userProfile) throw new Error('user not found')
        res.status(200).json(userProfile);
    } catch (err) {
        next(err)
    }
}

module.exports = generalRouter;

