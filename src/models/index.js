'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')
const diseaseModel = require('../models/diseaseControl/diseaseControl')
const prescriptionModel = require('../models/prescriptions/prescriptions')




const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);
let diseases = diseaseModel(sequelize, DataTypes);
let prescriptions = prescriptionModel(sequelize, DataTypes);




module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    physician: new Collection(physician),
    disease: new Collection(diseases),
    prescription: new Collection(prescriptions),
};
    


