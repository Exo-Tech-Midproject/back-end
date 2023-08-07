"use strict";

const models = require("../../models");

module.exports = async (req, res, next) => {
  try {
    console.log(req.params.model);
    if (!req.headers.authorization) {
      _authError();
    }
    const schema = models[req.params.model];

    const token = req.headers.authorization.split(" ").pop();

    const validUser = await schema.model.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;

    if(req.params.username === req.user.username){

      next();
    }else _authError()



    //! updated by tasneem
    if (req.user.username === req.params.username) {
      next();
    } else _authError();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next("Invalid Login");
  }
};
