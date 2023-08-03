'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')






const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);



module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    physician:new Collection(physician)
};
    


