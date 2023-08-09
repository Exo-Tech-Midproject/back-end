// 'use strict'

// const express = require('express');
// const { patient, disease, physician, prescription } = require('../../models');
// const bearerPatient = require('../../middleware/auth/bearerPatient')
// const prescriptionRouter = express.Router();



// prescriptionRouter.get('/patient/:username/prescriptions', bearerPatient, getAllPatientPrescriptions)
// prescriptionRouter.get('/patient/:username/prescriptions/:id', bearerPatient, getPatientPrescriptionsById)
// prescriptionRouter.get('/patient/:username/prescriptions/:physicianUN', bearerPatient, getPatientPrescriptionsByPhysicianName)




// async function getAllPatientPrescriptions(req, res, next) {
//     {
//         try {

//         let { username } = req.params
//         let user = await patient.getByUN(username);

//         if(user){  

//             let records = await prescription.model.findAll({where:{ patientName: username }});

//             if(records) {

//                 res.status(200).json(records);

//             }else throw new Error('There are no prescriptions for this patient')
//         }else throw new Error(`Patient doesn't exist`)
//         } catch (e) {
//         next(e.message)
//         }
//     }
// }
// async function getPatientPrescriptionsById(req, res, next) {
//     {
//         try {

//         let { username, id } = req.params
//         let user = await patient.getByUN(username);

//         if(user){  

//             let records = await prescription.model.findOne({where:{ patientName: username , id: id}});

//             if(records) {

//                 res.status(200).json(records);

//             }else throw new Error(`This prescriptions doesn't exist`)
//         }else throw new Error(`Patient doesn't exist`)
//         } catch (e) {
//         next(e.message)
//         }
//     }
// }
// async function getPatientPrescriptionsByPhysicianName(req, res, next) {
//     {
//         try {

//         let { username, physicianUN } = req.params
//         let user = await patient.getByUN(username);

//         if(user){  

//             let records = await prescription.model.findAll({where:{ patientName: username , physicianName: physicianUN}});

//             if(records) {

//                 res.status(200).json(records);

//             }else throw new Error(`This prescriptions doesn't exist`)
//         }else throw new Error(`Patient doesn't exist`)
//         } catch (e) {
//         next(e.message)
//         }
//     }
// }



// module.exports = prescriptionRouter