// 'use strict'

// const express = require('express');
// const { patient, disease, physician } = require('../../models');
// const bearerAuthphysician = require('../../middleware/auth/bearerPhysician');

// const relationRouter = express.Router();




// relationRouter.get('/allUsersHistory', handleAllUsers)
// relationRouter.get('/allPhysicianCreatedHistory', handleAllphysicianHistory)
// relationRouter.get('/profile/:model/:username/CreatedHistory',bearerAuthphysician ,handleOnephysicianHistory)
// relationRouter.get('/profile/:model/:username/:patientUN/subscribe',bearerAuthphysician ,handleSubscirbe)


// async function handleAllUsers(req,res) {
//     let allHistory = await patient.getRelatedData(disease.model)

//     res.status(200).json(allHistory)
// }
// async function handleAllphysicianHistory(req,res) {
//     let allHistory = await physician.getRelatedDataPhysician(disease.model)

//     res.status(200).json(allHistory)
// }
// async function handleOnephysicianHistory(req,res,next) {
//     const {username} = req.params
//     try {

//         let allHistory = await physician.getRelatedDataOnePhysician(username,disease.model)
    
//         res.status(200).json(allHistory)
//     } catch(err){
//         next(err)
//     }
// }
// async function handleSubscirbe(req,res,next) {
//     const {username,patientUN} = req.params
//     try {
//         console.log(patientUN,username,model)
//         let physicianName = await physician.getByUN(username)
//         let patientName = await patient.getByUN(patientUN)
//         console.log(physicianName,patientName)
//         await physicianName.addSubscriber(patientName)
//         let result = await physicianName.getSubscriber({
//             attributes: ['username' ,'mobileNumber', 'emailAddress', 'gender', 'fullName']
//         }) 
        
    
//         res.status(200).json(result)
//     } catch(err){
//         next(err)
//     }
// }


// module.exports = relationRouter