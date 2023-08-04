'use strict';

const models = require('../../models');

module.exports = (req, res, next) => {
  const modelNameB = req.params.modelB;
  if (models[modelNameB]) {
    req.modelB = models[modelNameB];
    next();
  } else {
    next('Invalid ModelB, AccessDenied');
  }
}