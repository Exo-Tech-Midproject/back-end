'use strict';

const base64 = require('base-64');

const {physician} = require('../../models')


module.exports = async (req, res, next) => {

    if (!req.headers.authorization) { return _authError(); }

    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');



    try {
        req.user = await physician.model.authenticateBasic(user, pass)
        next();
    } catch (e) {
        _authError()

        console.log(e)
    }

    function _authError() {

        res.status(403).send('Invalid Login');
    }
}

