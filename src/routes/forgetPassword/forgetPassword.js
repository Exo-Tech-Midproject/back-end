'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const { patient, physician, } = require('../../models');
const passwordRouter = express.Router();
const bearerAuth = require('../../middleware/auth/bearer');

const crypto = require('crypto');
const modelMiddleware = require('../../middleware/routerModelling/routerModelling');
passwordRouter.param('model', modelMiddleware);

function generateResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    return resetToken;
}

const nodemailer = require('nodemailer');

//---------------------

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

//----------------
//routes

passwordRouter.post('/forgotpassword/:model/:username', async (req, res, next) => {

    const username = req.params.username;
    const { emailAddress } = req.body;

    const user = await req.model.getByUN(username);
    //console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", user)


    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    let obj = {
        resetToken: resetToken
    }
    let savedData = await req.model.updateByUN(username, obj);

    //console.log('resetToken', user.resetToken)


    sendResetEmail(emailAddress, resetToken);

    res.status(200).json({ message: 'Password reset email sent', obj });
});


passwordRouter.post('/resetpassword/:model/:username', async (req, res, next) => {

    const username = req.params.username;
    const { resetToken, newPassword } = req.body;


    let hashedPass = await bcrypt.hash(newPassword, 10);
    console.log(hashPassword, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvs")


    const user = await req.model.getByUN(username);

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

    let savedData = await req.model.updateByUN(username, obj);
    const userAfter = await req.model.getByUN(username);
    console.log(userAfter, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

    res.status(200).json({ message: 'Password reset successfully', obj });

});

module.exports = passwordRouter;