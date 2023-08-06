'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')





const QuestionAnswerModel = require('./questionAnswer/questionAnswer')
const commentsModel = require('./questionAnswer/comments')
const diseaseModel = require('../models/diseaseControl/diseaseControl')
const prescriptionModel = require('../models/prescriptions/prescriptions')





const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);

let QuestionAnswer = QuestionAnswerModel(sequelize, DataTypes);
let comments = commentsModel(sequelize, DataTypes);
let diseases = diseaseModel(sequelize, DataTypes);
let prescriptions = prescriptionModel(sequelize, DataTypes);

// sourceKey -> PK
QuestionAnswer.hasMany(comments, {as : 'Comments',foreignKey: 'postID', sourceKey: 'id'});

// targetKey -> the target model PK
comments.belongsTo(QuestionAnswer, {foreignKey: 'postID', targetKey: 'id'})


module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    QuestionAnswer:new Collection(QuestionAnswer),
    Comment: new Collection(comments),
    physician: new Collection(physician),
    disease: new Collection(diseases),
    prescription: new Collection(prescriptions),
};
    


