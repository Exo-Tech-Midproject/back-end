'use strict';

const base64 = require('base-64');

const models = require('../../models')

module.exports = async (req, res, next) => {

    if (!req.headers.authorization) { return _authError(); }

    // console.log('aaaaaaaaaaa',req.headers.authorization)

    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');

    const schema = models[req.params.model]
    console.log(schema)
    try {
        req.user = await schema.model.authenticateBasic(user, pass)
        next();
    } catch (e) {
        _authError()
        console.log(e)
    }

    function _authError() {
        res.status(403).send('Invalid Login');
    }
}