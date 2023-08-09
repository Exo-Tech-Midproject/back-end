"use strict";

const {patient} = require("../../models");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(" ").pop();

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
