// 'use strict'

// const express = require('express');
// const diseaseRouter = express.Router();
// const bearerAuthPatient = require('../../middleware/auth/bearerPatient')



// const {disease, patient,prescription} = require('../../models/index')


// diseaseRouter.get('/patient/:username/disease',bearerAuthPatient,getPatientHistroyHandler)



// async function getPatientHistroyHandler(req, res, next){
//     {
//         try {

//         let { username } = req.params
//         let user = await patient.getByUN(username);

//         if(user){  

//             let records = await disease.getByUN(username);

//             if(records) {

//                 res.status(200).json(records);

//             }else throw new Error('There are no records for this patient')
//         }else throw new Error(`Patient doesn't exist`)
//         } catch (e) {
//         next(e.message)
//         }
//     }
// }


// module.exports = diseaseRouter;