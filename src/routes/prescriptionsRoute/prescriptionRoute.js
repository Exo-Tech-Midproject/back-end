// 'use strict'

// const express = require('express');
// const { patient, disease, physician, prescription } = require('../../models');
// const bearer = require('../../middleware/auth/bearer');
// const routerModelling = require('../../middleware/routerModelling/routerModelling');
// const prescriptionRouter = express.Router();


// prescriptionRouter.param('model', routerModelling)

// prescriptionRouter.get('/profile/:model/prescriptions/:patientUN', bearer, handleAllUserPrescriptions)
// // prescriptionRouter.post('/profile/:model/:physicianUN/addPrescription/:patientUN', bearer, handlePhysicianAddPrescription)
// prescriptionRouter.get('/profile/:model/:physicianUN/allPrescriptions',bearer ,handleOnephysicianAllPrescriptions)



// async function handleAllUserPrescriptions(req, res) {
//     const { patientUN } = req.params
//     let allPrescriptions = await patient.getRelatedDataForOne(patientUN, prescription.model)

//     res.status(200).json(allPrescriptions)
// }
// // async function handlePhysicianAddPrescription(req, res) {            ----------->        later to use
// //     const { model, physicianUN, patientUN } = req.params
// //     try {
// //         if (model !== 'physician') throw new Error('Access denied')
// //         req.body.patientName=patientUN
// //         req.body.physicianName=physicianUN
// //         let newPrescription = prescription.create(req.body)
// //         res.status(201).json(newPrescription)
// //     } catch (err) {
// //         next(err)
// //     }
// // }
// async function handleOnephysicianAllPrescriptions(req, res, next) {
//     const { physicianUN } = req.params
//     let allPrescriptions = await physician.getRelatedDataForOnephys(physicianUN, prescription.model)

//     res.status(200).json(allPrescriptions)
// }
// // async function handleSubscirbe(req,res,next) {
// //     const {model,physicianUN,patientUN} = req.params
// //     try {
// //         if(model !== 'physician') throw new Error('Access denied')
// //         console.log(patientUN,physicianUN,model)
// //         let physicianName = await physician.getByUN(physicianUN)
// //         let patientName = await patient.getByUN(patientUN)
// //         console.log(physicianName,patientName)
// //         await physicianName.addSubscriber(patientName)
// //         let result = await physicianName.getSubscriber({
// //             attributes: ['username' ,'mobileNumber', 'emailAddress', 'gender', 'fullName']
// //         }) 


// //         res.status(200).json(result)
// //     } catch(err){
// //         next(err)
// //     }
// // }


// module.exports = prescriptionRouter