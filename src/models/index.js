'use strict'


const { Sequelize, DataTypes } = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';
const Collection = require('./CRUD/CRUD');


//---------------------------------------------------------

const appointmentModel = require('./appointment/appointment')
const patientModel = require('./patient/patientInfo')
const physicianModel = require('./physician/physicianInfo')
const groupModel = require('./group/group')
const groupPostsModel = require('./group/groupPosts')





const ratingModel = require('./rating/rating')
const QuestionAnswerModel = require('./questionAnswer/questionAnswer')
const commentsModel = require('./questionAnswer/comments')
const diseaseModel = require('../models/diseaseControl/diseaseControl')
const prescriptionModel = require('../models/prescriptions/prescriptions')
const vitalsModel = require('../models/vitalSigns/vitalSigns')
const chatModel = require('../models/chatMessages/chatMessages')
const notificationsModel = require('../models/notifications/notifications')



//---------------------------------------------------------



const sequelize = new Sequelize(DBURL)
let physician = physicianModel(sequelize, DataTypes);
let patients = patientModel(sequelize, DataTypes);
let group = groupModel(sequelize, DataTypes);
let groupPosts = groupPostsModel(sequelize, DataTypes);
let appointment = appointmentModel(sequelize, DataTypes);
let QuestionAnswer = QuestionAnswerModel(sequelize, DataTypes);
let comments = commentsModel(sequelize, DataTypes);
let diseases = diseaseModel(sequelize, DataTypes);
let prescriptions = prescriptionModel(sequelize, DataTypes);
let vitals = vitalsModel(sequelize, DataTypes);
let rating = ratingModel(sequelize, DataTypes);
let messages = chatModel(sequelize, DataTypes)
let notifications = notificationsModel(sequelize, DataTypes)





//--------------------------------------------------------- Relations

//--------------------------------------------------------------------------------------- History Relations
//---------------------------------------------------------------------------------------------------------
//patient - history relation

patients.hasOne(diseases, { as: 'History', foreignKey: 'patientUN', sourceKey: 'username' })
diseases.belongsTo(patients, { foreignKey: 'patientUN', targetKey: 'username' })

// //physician - history relation

physician.hasMany(diseases, { as: 'HistoryCreated', foreignKey: 'physicianUN', sourceKey: 'username' });
diseases.belongsTo(physician, { as: 'CreatedBy', foreignKey: 'physicianUN', targetKey: 'username' });


//--------------------------------------------------------------------------------------- Prescriptions Relations
//---------------------------------------------------------------------------------------------------------------

// patient - prescription relation

patients.hasMany(prescriptions, { as: 'Prescriptions', foreignKey: 'patientName', sourceKey: 'username' })
prescriptions.belongsTo(patients, { as: 'Owner', foreignKey: 'patientName', targetKey: 'username' })

//physician - prescription relation

physician.hasMany(prescriptions, { as: 'PrescriptionsCreated', foreignKey: 'physicianName', sourceKey: 'username' });
prescriptions.belongsTo(physician, { as: 'PrescribedBy', foreignKey: 'physicianName', targetKey: 'username' });



//--------------------------------------------------------------------------------------- Q&A Relations
//---------------------------------------------------------------------------------------------------------

//Question Posts - comments relations

QuestionAnswer.hasMany(comments, { as: 'Comments', foreignKey: 'postID', sourceKey: 'id' });
comments.belongsTo(QuestionAnswer, { foreignKey: 'postID', targetKey: 'id' })



//--------------------------------------------------------------------------------------- Groups Relations
//---------------------------------------------------------------------------------------------------------

// relation one to many between physician & group

physician.hasMany(group, { foreignKey: 'physicianUN', sourceKey: 'username', as: 'Groups', });

group.belongsTo(physician, { foreignKey: 'physicianUN', targetKey: 'username', as: 'Maker', });

// // relation one to many between group & patients

patients.belongsToMany(group, { as: 'Group', through: 'patients_group', foreignKey: 'patientId' })

group.belongsToMany(patients, { as: 'Member', through: 'patients_group', foreignKey: 'groupId' })

// // relations between group & groupPosts

group.hasMany(groupPosts, { foreignKey: 'groupId', sourceKey: 'id', as: 'posts', });
groupPosts.belongsTo(group, { foreignKey: 'groupId', targetKey: 'id', as: 'group', });

//--------------------------------------------------------------------------------------- Appointments Relations
//--------------------------------------------------------------------------------------------------------------

// patient - appointment relations
patients.hasMany(appointment, { foreignKey: 'patientUsername', sourceKey: 'username', as: 'appointments', });
appointment.belongsTo(patients, { foreignKey: 'patientUsername', targetKey: 'username', as: 'patient', });

// physician - appointment relations
physician.hasMany(appointment, { foreignKey: 'physicianUsername', sourceKey: 'username', as: 'appointments', });
appointment.belongsTo(physician, { foreignKey: 'physicianUsername', targetKey: 'username', as: 'physician', });

//--------------------------------------------------------------------------------------- Subscriptions Relations
//---------------------------------------------------------------------------------------------------------------
//physician - patient relation

physician.belongsToMany(patients, { as: 'Subscriber', foreignKey: 'physiciantUN', through: "subscriptions" })
patients.belongsToMany(physician, { as: 'Subscription', foreignKey: 'patientUN', through: "subscriptions" })

//--------------------------------------------------------------------------------------- Vitls Relations
//---------------------------------------------------------------------------------------------------------------

//patient - vitals relation

patients.hasMany(vitals, { as: 'VitalsRecord', foreignKey: 'patientUN', sourceKey: "username" })
vitals.belongsTo(patients, { as: 'DoneBy', foreignKey: 'patientUN', targetKey: "username" })

//--------------------------------------------------------------------------------------- Rating Relations
//---------------------------------------------------------------------------------------------------------------

physician.hasMany(rating, { as: 'Rating', foreignKey: 'physician', sourceKey: "username" })
rating.belongsTo(physician, { as: 'RatedBy', foreignKey: 'physician', targetKey: "username" })

patients.hasMany(rating, { as: 'CreatedRating', foreignKey: 'patient', sourceKey: "username" })
rating.belongsTo(patients, { as: 'CraetedBy', foreignKey: 'patient', targetKey: "username" })

//---------------------------------------------------------
module.exports = {
    db: sequelize,
    patient: new Collection(patients),
    QuestionAnswer: new Collection(QuestionAnswer),
    physician: new Collection(physician),
    disease: new Collection(diseases),
    prescription: new Collection(prescriptions),
    group: new Collection(group),
    vital: new Collection(vitals),
    appointment: new Collection(appointment),
    Comment: new Collection(comments),
    groupPosts: new Collection(groupPosts),
    rating: new Collection(rating),
    messages: new Collection(messages),
    notification: new Collection(notifications)

};




