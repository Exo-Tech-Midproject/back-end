'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')
const groupModel = require('./group/group')





const QuestionAnswerModel = require('./questionAnswer/questionAnswer')
const diseaseModel = require('../models/diseaseControl/diseaseControl')
const prescriptionModel = require('../models/prescriptions/prescriptions')



const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);
let group = groupModel(sequelize, DataTypes);

let QuestionAnswer = QuestionAnswerModel(sequelize, DataTypes);
let diseases = diseaseModel(sequelize, DataTypes);
let prescriptions = prescriptionModel(sequelize, DataTypes);


// relation one to many between physician & group

physician.hasMany(group, {foreignKey: 'physicianId', sourceKey: 'id'});

group.belongsTo(physician, {foreignKey: 'physicianId', targetKey: 'id'})

// relation one to many between group & patients

patients.belongsToMany(group, {as : 'Group',through: 'patients_group' , foreignKey: 'patientId' })

group.belongsToMany(patients, {as : 'Member',through: 'patients_group' , foreignKey: 'groupId' })



module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    QuestionAnswer:new Collection(QuestionAnswer),
    physician: new Collection(physician),
    disease: new Collection(diseases),
    prescription: new Collection(prescriptions),
    group: new Collection(group)
};
