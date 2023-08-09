// 'use strict'

// const express = require('express');
// const vitalsPhysicianRouter = express.Router();
// // const basicAuth = require('../../middleware/auth/basic')
// const bearerAuth = require('../../middleware/auth/bearer')

// // const models = require('../../models/index')
// const modelMiddleware = require('../../middleware/routerModelling/routerModelling')
// const {disease, patient,prescription,vital,physician} = require('../../models/index')

// vitalsPhysicianRouter.param('model', modelMiddleware);

// vitalsPhysicianRouter.get('/:model/profile/:username/patients/vitals', bearerAuth ,getAllPatientsVitals)
// vitalsPhysicianRouter.get('/:model/profile/:username/patients/:PatientUN/vitals', bearerAuth ,getOnePatientVitals)



// async function getAllPatientsVitals (req,res,next){
//     const { model, username } = req.params
//     try {
//         if (model !== 'physician') throw new Error(`You aren't authorized to visit this page`)
//         // let getPhysician = await physician.getByUN(username)
//         let getAllPatientsRecords = await physician.model.findByPk(username,{
//             include: [
//                 {
//                     model:patient.model,
//                     as: 'Subscriber',
//                     attributes:['username','fullName','gender','insurance','race','maritalStatus'],
//                     include:
//                     {
//                         model:vital.model,
//                         as:'VitalsRecord' 
//                     }
//                 }
//             ],
//             attributes:['username']
//         })
//         if(!getAllPatientsRecords) throw new Error('Physician Not Found')
//         let patientsRecordsCleaned = getAllPatientsRecords.Subscriber
//         res.status(200).json(patientsRecordsCleaned)
//     } catch (err) {
//         next(err)
//     }
    

// }
// async function getOnePatientVitals (req,res,next){
//     const { model, username, id, PatientUN } = req.params
//     try {
//         if (model !== 'physician') throw new Error(`You aren't authorized to visit this page`)
//         // let getPhysician = await physician.getByUN(username)
//         let getAllPatientsRecords = await physician.model.findByPk(username,{
//             include: [
//                 {

//                     model:patient.model,
//                     as: 'Subscriber',
//                     where:{
//                         username:PatientUN
//                     },
//                     attributes:['username','fullName','gender','insurance','race','maritalStatus'],
//                     include:
//                     {
//                         model:vital.model,
//                         as:'VitalsRecord' 
//                     }
//                 }
//             ],
//             attributes:['username']
//         })
//         if(!getAllPatientsRecords) throw new Error('Physician Not Found')
//         let patientsRecordsCleaned = getAllPatientsRecords.Subscriber[0]
//         res.status(200).json(patientsRecordsCleaned)
//     } catch (err) {
//         next(err)
//     }
    

// }    





// module.exports = vitalsPhysicianRouter;