'use strict'

const {Sequelize,DataTypes} = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const physicianModel = require('./physician/physicianInfo')
const Collection = require('./CRUD/CRUD')



const sequelize = new Sequelize(DBURL)
const physician = physicianModel(sequelize, DataTypes);


module.exports = {
    db: sequelize,
    physician:new Collection(physician)
}