'use strict'

const { Router } = require("express");

class MethodCollection {
    constructor(model) {
      this.model = model;
    }
  
    get(id) {
      if (id) {
        return this.model.findOne({ where: { id } });
      }
      else {
        return this.model.findAll({});
      }
    }

    getByUN(username) {
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
  
    update(id, data) {
      return this.model.findOne({ where: { id } })
        .then(record => record.update(data));
    }

    updatebyUN(username, data) {
      return this.model.findOne({ where: { username } })
        .then(record => record.update(data));
    }
  
    delete(id) {
      return this.model.destroy({ where: { id }});
    }

    deleteByUN(username) {
      return this.model.destroy({ where: { username }});
    }
  
  }
  
  module.exports = MethodCollection;