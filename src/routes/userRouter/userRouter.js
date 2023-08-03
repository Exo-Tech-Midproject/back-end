'use strict'

const express = require('express');
const userRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic')
const bearerAuth = require('../../middleware/auth/bearer')

const models = require('../../models/index')
const modelMiddleware = require('../../middleware/routerModelling/routerModelling')

userRouter.param('model', modelMiddleware);


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

    const userProfile = await req.model.get();

    if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json(userProfile);
    }

});

userRouter.put('/profile/:model/:username', async (req, res) => {
    const username = req.params.username;
    const obj = req.body;

    let updateProfile = await req.model.update(username, obj);

    if (!updateProfile) {
        return res.status(404).json({ error: 'Access denied' });
    } else {
        res.status(200).json(updateProfile);
    }
});

module.exports = userRouter;