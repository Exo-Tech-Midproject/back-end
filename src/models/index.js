'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')

const appointmentModel = require('./appointment/appointment')




const QuestionAnswerModel = require('./questionAnswer/questionAnswer')
const diseaseModel = require('../models/diseaseControl/diseaseControl')
const prescriptionModel = require('../models/prescriptions/prescriptions')





const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);
let appointment = appointmentModel(sequelize, DataTypes);

let QuestionAnswer = QuestionAnswerModel(sequelize, DataTypes);
let diseases = diseaseModel(sequelize, DataTypes);
let prescriptions = prescriptionModel(sequelize, DataTypes);



//--------------------------------------------
// appointment association
patients.hasMany(appointment, { foreignKey: 'patientUsername', sourceKey: 'username', as: 'appointments', });
appointment.belongsTo(patients, { foreignKey: 'patientUsername', targetKey: 'username', as: 'patient', });

physician.hasMany(appointment, { foreignKey: 'physicianUsername', sourceKey: 'username', as: 'appointments', });
appointment.belongsTo(physician, { foreignKey: 'physicianUsername', targetKey: 'username', as: 'physician', });
//-------------------------------------------------


module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    QuestionAnswer: new Collection(QuestionAnswer),
    physician: new Collection(physician),
    disease: new Collection(diseases),
    prescription: new Collection(prescriptions),
    appointment: new Collection(appointment)
};



