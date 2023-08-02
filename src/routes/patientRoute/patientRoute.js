'use strict';

const express = require('express');
const patientRouter = express.Router();
const { patient } = require('../../models/index');
const basicAuth = require('../../middleware/auth/basic');
const bearerAuth = require('../../middleware/auth/bearer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Your secret key for signing the JWT. Keep it secret!
const SECRET = process.env.SECRET;

patientRouter.post('/signup/:model', async (req, res, next) => {
    try {
        let patientRecord = await patient.create(req.body);
        const output = {
            user: patientRecord
        };
        res.status(201).json(output);
    } catch (e) {
        next(e.message);
    }
});

patientRouter.post('/login/:model', basicAuth, async (req, res, next) => {
    try {
        const payload = {
            user: req.user,
        };

        const token = jwt.sign(payload, SECRET);

        const user = {
            user: req.user
        };
        res.status(200).json(user);
    } catch (e) {
        next(e.message);
    }
});
patientRouter.get('/:model/secret', bearerAuth, async (req, res, next) => {
    res.send('hello')
});

module.exports = patientRouter;
