'use strict'

const { Router } = require("express");

class MethodCollection {
  constructor(model) {
    this.model = model;
  }

  get(username) {
    if (username) {
      return this.model.findOne({ where: { username } });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(username, data) {
    return this.model.findOne({ where: { username } })
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }

}

module.exports = MethodCollection;