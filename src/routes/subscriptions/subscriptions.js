// 'use strict'

// const express = require('express');
// const subscriptionRouter = express.Router();

// const bearerAuthphysician = require('../../middleware/auth/bearerPhysician')
// const bearerAuthPatient = require('../../middleware/auth/bearerPatient')




// const {disease, patient, prescription, physician} = require('../../models/index')








// subscriptionRouter.get('/patient/profile/subs/:patientUN', bearerAuthPatient, async (req, res, next) => {
//     try {

//         let {patientUN} = req.params



//     let records = await patient.getByUN(patientUN);
//     if(records) {
//         let subs = await patient.getSubscriptionsPatient(patientUN, physician.model)
//         res.status(200).json(subs)
//     }else throw new Error('Access Denied / page does not exist')
//     } catch (e) {
//     next(e.message)
//     }
// });
// subscriptionRouter.get('/physician/profile2/subs/:physicianUN', bearerAuthphysician, async (req, res, next) => {
//     try {

//         let {physicianUN} = req.params
  
//     // console.log(model)
//     let records = await physician.getByUN(physicianUN);
//     if(records) {
//         let subs = await physician.getSubscriptionsPhysician(physicianUN, physician.model)
//         res.status(200).json(subs)
//     }else throw new Error('Access Denied / page does not exist')
//     } catch (e) {
//     next(e.message)
//     }
// });

// // diseaseRouter.get('/:model/:physicianUN/patients/:patientUN/:modelB', bearerAuth, async (req, res, next) => {
// //     try {
// //         // req.body.username = req.body.username.toLowerCase()
// //     let {patientUN,model,modelB} = req.params
// //     if(model !== 'physician') throw new Error('Access Denied')
// //     let records = await req.modelB.getByUN(patientUN);
// //     const output = {
// //         patientRecord: records
// //     };
// //     res.status(200).json(output);
// //     } catch (e) {
// //     next(e.message)
// //     }
// // });

// // diseaseRouter.post('/:model/:physicianUN/patients/:patientUN/:modelB', bearerAuth, async (req, res, next) => {
// //     try {
// //         // req.body.username = req.body.username.toLowerCase()
// //     let {patientUN,model,physicianUN} = req.params
// //     if(model !== 'physician') throw new Error('Access Denied')
// //     let findUser = await patient.getByUN(patientUN);
// //     if(findUser) {
// //         req.body.patientUN = patientUN
// //         req.body.physicianUN = physicianUN
// //         let createRecords = await req.modelB.create(req.body);
// //         const output = {
// //             patientCreatedRecord: createRecords
// //         };   
// //         res.status(201).json(output);
// //     }else throw new Error('patient not found')

    
// //     } catch (e) {
// //     next(e.message)
// //     }
// // });

// // diseaseRouter.put('/:model/:physicianUN/patients/:patientUN/:modelB', bearerAuth, async (req, res, next) => {
// //     try {
// //         // req.body.username = req.body.username.toLowerCase()
// //     let {patientUN,model,modelB,physicianUN} = req.params
// //     if(model !== 'physician') throw new Error('Access Denied')
// //     let findUser = await patient.getByUN(patientUN);
// //     if(findUser) {
// //         req.body.physicianUN = physicianUN
// //         let updateRecords = await req.modelB.updateByUN(patientUN,req.body);
// //         const output = {
// //             patientUpdatedRecord: updateRecords
// //         };
// //         res.status(202).json(output);
// //     }else throw new Error('patient not found')
// //     } catch (e) {
// //     next(e.message)
// //     }
// // });
// module.exports = subscriptionRouter;