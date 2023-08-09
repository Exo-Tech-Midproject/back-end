// 'use strict'

// const express = require('express');
// const vitalsRouter = express.Router();
// // const basicAuth = require('../../middleware/auth/basic')
// const bearerAuth = require('../../middleware/auth/bearer')

// // const models = require('../../models/index')
// const modelMiddleware = require('../../middleware/routerModelling/routerModelling')
// const {disease, patient,prescription,vital} = require('../../models/index')

// vitalsRouter.param('model', modelMiddleware);

// vitalsRouter.post('/:model/profile/:username/vitals', bearerAuth ,addVitals)
// vitalsRouter.get('/:model/profile/:username/vitals', bearerAuth ,getAllVitals)
// vitalsRouter.get('/:model/profile/:username/vitals/:id', bearerAuth ,getOneVitals)
// vitalsRouter.put('/:model/profile/:username/vitals/:id', bearerAuth ,updateVitals)
// vitalsRouter.delete('/:model/profile/:username/vitals/:id', bearerAuth ,deleteVitals)


// async function addVitals (req,res,next){
//     const { model, username } = req.params
//     try {

//         if (model !== 'patient') throw new Error(`You aren't authorized to visit this page`)
//         req.body.patientUN = username
//         let addedVitals = await vital.create(req.body)
//         res.status(201).json(addedVitals)
//     } catch (err) {
//         next(err)
//     }
    

// }
// async function getAllVitals (req,res,next){
//     const { model, username } = req.params
//     try {
//         if (model !== 'patient') throw new Error(`You aren't authorized to visit this page`)
//         req.body.patientUN = username
//         let allVitals = await vital.model.findAll({where:{patientUN:username}})
//         res.status(200).json(allVitals)
//     } catch (err) {
//         next(err)
//     }
    

// }
// async function getOneVitals (req,res,next){
//     const { model, username, id } = req.params
//     try {
//         if (model !== 'patient') throw new Error(`You aren't authorized to visit this page`)
//         req.body.patientUN = username
//         let oneVital = await vital.get(id)
//         if(oneVital){
//          res.status(200).json(oneVital)
//         } else throw new Error(`This record doesn't exist`)
//     } catch (err) {
//         next(err)
//     }
    

// }    
// async function updateVitals (req,res,next){
//     const { model, username, id } = req.params
//     try {
//         if (model !== 'patient') throw new Error(`You aren't authorized to visit this page`)
//         req.body.patientUN = username
//         let updateVital = await vital.update(id, req.body)
//         res.status(200).json(updateVital)
//     } catch (err) {
//         next(err)
//     }
    

// }
// async function deleteVitals (req,res,next){
//     const { model, username, id } = req.params
//     try {
//         if (model !== 'patient') throw new Error(`You aren't authorized to visit this page`)
//         let deletedVital = await vital.delete(id)
//         res.status(200).json('Deleted Successfully')
//     } catch (err) {
//         next(err)
//     }
    

// }




// module.exports = vitalsRouter;