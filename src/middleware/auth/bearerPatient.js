"use strict";

const { patient } = require("../../models");

module.exports = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ").pop();
      // console.log(token)
    } else if (req.cookies.authToken) {
      token = req.cookies.authToken;
    } else {
      _authError();
    }

    const validUser = await patient.model.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;

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
