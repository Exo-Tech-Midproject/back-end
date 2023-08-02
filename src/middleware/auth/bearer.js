'use strict';

const models = require('../../models')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }
console.log(req.headers.authorization)
    const schema = models[req.params.model]

    const token = req.headers.authorization.split(' ').pop();

    const validUser = await schema.model.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}