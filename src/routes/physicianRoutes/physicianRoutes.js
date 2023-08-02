'use strict'

const express = require('express');
const physicianRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic')

const { physician } = require('../../models/index')

physicianRouter.post('/signup/physician', async (req, res, next) => {
    try {
        req.body.username = req.body.username.toLowerCase()
    let physicianUser = await physician.create(req.body);
    const output = {
        user: physicianUser,
        // token: userRecord.token
    };
    res.status(201).json(output);
    } catch (e) {
    next(e.message)
    }
});

physicianRouter.post('/login/physician', basicAuth, (req, res, next) => {
    const user = {
        user: req.user,
        // token: req.user.token
    };
    res.status(200).json(user);
});

module.exports = physicianRouter;