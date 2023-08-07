'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')

//---------------------------------------------------------



const QuestionAnswerModel = require('./questionAnswer/questionAnswer')
const diseaseModel = require('../models/diseaseControl/diseaseControl')
const prescriptionModel = require('../models/prescriptions/prescriptions')
const vitalsModel = require('../models/vitalSigns/vitalSigns')


//---------------------------------------------------------


const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);

let QuestionAnswer = QuestionAnswerModel(sequelize, DataTypes);
let diseases = diseaseModel(sequelize, DataTypes);
let prescriptions = prescriptionModel(sequelize, DataTypes);
let vitals = vitalsModel(sequelize, DataTypes);

//---------------------------------------------------------
//patient - history relation
patients.hasOne(diseases,{ as:'History', foreignKey:'patientUN', sourceKey:'username'})
diseases.belongsTo(patients,{foreignKey:'patientUN', targetKey:'username'})

//patient - prescription relation

patients.hasMany(prescriptions,{ as:'Prescriptions', foreignKey:'patientName', sourceKey:'username'})
prescriptions.belongsTo(patients,{foreignKey:'patientName', targetKey:'username'})

//physician - history relation

physician.hasMany(diseases, { as: 'HistoryCreated', foreignKey: 'physicianUN', sourceKey: 'username' });
diseases.belongsTo(physician, { as: 'CreatedBy', foreignKey: 'physicianUN', targetKey: 'username' });

//physician - prescription relation

physician.hasMany(prescriptions, { as: 'PrescriptionsCreated', foreignKey: 'physicianName', sourceKey: 'username' });
prescriptions.belongsTo(physician, { as: 'PrescribedBy', foreignKey: 'physicianName', targetKey: 'username' });

//physician - patient relation

physician.belongsToMany(patients,{as:'Subscriber', foreignKey:'physiciantUN',through: "subscriptions"})
patients.belongsToMany(physician,{as: 'Subscription',foreignKey:'patientUN',through: "subscriptions"})

//patient - vitals relation

patients.hasMany(vitals,{as:'VitalsRecord', foreignKey:'patientUN',sourceKey: "username"})
vitals.belongsTo(patients,{as: 'DoneBy',foreignKey:'patientUN',targetKey: "username"})



//---------------------------------------------------------
module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    QuestionAnswer:new Collection(QuestionAnswer),
    physician: new Collection(physician),
    disease: new Collection(diseases),
    prescription: new Collection(prescriptions),
    vital: new Collection(vitals)
};
    


