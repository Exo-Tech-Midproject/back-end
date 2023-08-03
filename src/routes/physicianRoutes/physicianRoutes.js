// 'use strict'

// const express = require('express');
// const physicianRouter = express.Router();
// const basicAuth = require('../../middleware/auth/basic')

// const { physician } = require('../../models/index')

// physicianRouter.post('/signup/:model', async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let physicianUser = await physician.create(req.body);
//     const output = {
//         user: physicianUser,
//         token: physicianUser.token
//     };
//     res.status(201).json(output);
//     } catch (e) {
//     next(e.message)
//     }
// });

// physicianRouter.post('/login/:model', basicAuth, (req, res, next) => {
//     const user = {
//         user: req.user,
//         token: req.user.token
//     };
//     res.status(200).json(user);
// });

// physicianRouter.get('/:model/secret', async (req, res, next) => {
//     let users = await physician.get()
//     res.status(200).json(users)
// });
// module.exports = physicianRouter;