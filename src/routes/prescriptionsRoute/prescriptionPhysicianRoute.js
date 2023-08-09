// 'use strict'

// const express = require('express');
// const { patient, disease, physician, prescription } = require('../../models');
// const bearerPhysician = require('../../middleware/auth/bearerPhysician');
// const prescriptionRouter = express.Router();



// prescriptionRouter.get('/physician/:username/patients/prescriptions', bearerPhysician, handleAllUserPrescriptions)
// prescriptionRouter.get('/physician/:username/patients/:patientUN/prescriptions',bearerPhysician ,getOnePatientAllPrescriptions)
// prescriptionRouter.post('/physician/:username/patients/:patientUN/prescriptions',bearerPhysician ,AddOnePatientPrescriptions)
// prescriptionRouter.put('/physician/:username/patients/:patientUN/prescriptions/:id',bearerPhysician ,AddOnePatientPrescriptions)
// prescriptionRouter.delete('/physician/:username/patients/:patientUN/prescriptions/:id',bearerPhysician ,AddOnePatientPrescriptions)



// async function handleAllUserPrescriptions(req, res ,next) {
//     try {
        
//         let { username} = req.params
//         let physicianFound = await physician.getByUN(username)

//         if (physicianFound) {
//             let allPrescriptions =  prescription.model.findAll({
//                 where: {
//                     physicianName: username
//                 }
//             })

//             if(allPrescriptions) {
                
//                 res.status(200).json(allPrescriptions);
//             } else throw new Error(`You don't have any prescriptions yet`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// }
// async function getOnePatientAllPrescriptions(req, res ,next) {
//     try {
        
//         let { username , patientUN} = req.params
//         let physicianFound = await physician.getByUN(username)

//         if (physicianFound) {
//             let allPrescriptions =  prescription.model.findAll({
//                 where: {
//                     physicianName: username,
//                     patientName:patientUN
//                 }
//             })

//             if(allPrescriptions) {
                
//                 res.status(200).json(allPrescriptions);
//             } else throw new Error(`You don't have any prescriptions yet for this patient`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// }
// async function AddOnePatientPrescriptions(req, res ,next) {
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
//                 req.body.patientName = patientUN
//                 req.body.physicianName = username
                
                
//                     let records = await prescription.create(req.body);
//                     res.status(201).json(records);
                
//             } else throw new Error(`This patient didn't subscribe for you`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// }
// async function AddOnePatientPrescriptions(req, res ,next) {
//     try {
        
//         let {patientUN , username , id} = req.params
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
//                 req.body.patientName = patientUN
//                 req.body.physicianName = username
//                 let existedRecord = await prescription.model.findOne({where:{
//                     id: id,
//                     patientName:patientUN,
//                     physicianName:username
//                 }})
//                 if(existedRecord) {
//                     let records = await prescription.updateByUN(id,req.body);
//                     res.status(202).json(records);
//                 } else throw new Error(`This patient doesn't have a current record, please create one first`)
//             } else throw new Error(`This patient didn't subscribe for you`)
//         } else throw new Error(`Physician isn't found`)

    
//     } catch (e) {
//     next(e.message)
//     }
// }




// module.exports = prescriptionRouter