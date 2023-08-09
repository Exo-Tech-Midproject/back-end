// 'use strict'

// const express = require('express');
// const diseaseRouter = express.Router();
// const bearerAuthPhysician = require('../../middleware/auth/bearerPhysician')



// const {disease, patient,prescription, physician} = require('../../models/index')

// diseaseRouter.get('/physician/:username/patients/disease', bearerAuthPhysician, getAllPatientHistory)
// diseaseRouter.get('/physician/:username/patients/:patientUN/disease', bearerAuthPhysician, getPatientHistoryForPhysicianByUN)
// diseaseRouter.post('/physician/:username/patients/:patientUN/disease', bearerAuthPhysician, addHistoryToPatientByUN)
// diseaseRouter.put('/physician/:username/patients/:patientUN/disease', bearerAuthPhysician, updateSinglePatientHistoryByUn)



// async function getAllPatientHistory(req, res, next) {
//     try {
        
//         let { username} = req.params
//         let physicianFound = await physician.getByUN(username)

//         if (physicianFound) {
//             let Allsubscribers = physician.model.findOne({
//                 where:{
//                     username:username
//                 },
//                 include: [
//                     {
//                         model: patient.model,
//                         as: 'Subscriber' ,
//                         include: {
//                             model:disease.model,
//                             as: 'History'
//                         }

//                     }
//                 ]
                    

//             })

//             if(Allsubscribers) {
                
//                 res.status(200).json(Allsubscribers);
//             } else throw new Error(`You don't have subscribers yet`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// }

// async function getPatientHistoryForPhysicianByUN(req, res, next){
    
//         try {
        
//             let {patientUN , username} = req.params
//             let physicianFound = await physician.getByUN(username)

//             if (physicianFound) {
//                 let subscribers = physicianFound.getSubsciber({
//                     where:{
//                         patientUN: patientUN
//                     },
//                     through:{
//                         model: "subscriptions"
//                     }

//                 })

//                 if(subscribers) {
//                     let records = await disease.getByUN(patientUN);
//                     res.status(200).json(records);
//                 } else throw new Error(`This patient didn't subscribe for you`)
//             } else throw new Error(`Physician isn't found`)

        
//         } catch (e) {
//         next(e.message)
//         }
    
// }

// async function addHistoryToPatientByUN (req, res, next){
//     try {
        
//         let {patientUN , username} = req.params
//         let physicianFound = await physician.getByUN(username)

//         if (physicianFound) {
//             let subscribers = physicianFound.getSubsciber({
//                 where:{
//                     patientUN: patientUN
//                 },
//                 through:{
//                     model: "subscriptions"
//                 }

//             })

//             if(subscribers) {
//                 req.body.patientUN = patientUN
//                 req.body.physicianUN = username
//                 let existedRecord = await disease.getByUN(patientUN)
//                 if(!existedRecord) {
//                     let records = await disease.create(req.body);
//                     res.status(201).json(records);
//                 } else throw new Error(`This patient already has a History, please choose updating instead of creating`)
//             } else throw new Error(`This patient didn't subscribe for you`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// };

//  async function updateSinglePatientHistoryByUn (req, res, next){
//     try {
        
//         let {patientUN , username} = req.params
//         let physicianFound = await physician.getByUN(username)

//         if (physicianFound) {
//             let subscribers = physicianFound.getSubsciber({
//                 where:{
//                     patientUN: patientUN
//                 },
//                 through:{
//                     model: "subscriptions"
//                 }

//             })

//             if(subscribers) {
//                 req.body.patientUN = patientUN
//                 req.body.physicianUN = username
//                 let existedRecord = await disease.getByUN(patientUN)
//                 if(existedRecord) {
//                     let records = await disease.updateByUN(patientUN,req.body);
//                     res.status(202).json(records);
//                 } else throw new Error(`This patient doesn't have a current record, please create one first`)
//             } else throw new Error(`This patient didn't subscribe for you`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// };
// module.exports = diseaseRouter;