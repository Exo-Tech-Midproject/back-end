'use strict'

const express = require('express');
const subscriptionRouter = express.Router();
// const basicAuth = require('../../middleware/auth/basic')
const bearerAuth = require('../../middleware/auth/bearer')

// const models = require('../../models/index')
const modelMiddleware = require('../../middleware/routerModelling/routerModelling')

const {disease, patient, prescription, physician} = require('../../models/index')

subscriptionRouter.param('model', modelMiddleware);






subscriptionRouter.get('/:model/profile/subs/:patientUN', bearerAuth, async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
        let {patientUN,model,modelB} = req.params
        console.log(model)
    // console.log(model)
    if(model !== 'patient') throw new Error('Access Denied')
    let records = await req.model.getByUN(patientUN);
    if(records) {
        let subs = await req.model.getSubscriptionsPatient(patientUN, physician.model)
        res.status(200).json(subs)
    }else throw new Error('Access Denied / page does not exist')
    } catch (e) {
    next(e.message)
    }
});
subscriptionRouter.get('/:model/profile2/subs/:physicianUN', bearerAuth, async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
        let {physicianUN,model,modelB} = req.params
        console.log(model)
    // console.log(model)
    if(model !== 'physician') throw new Error('Access Denied')
    let records = await req.model.getByUN(physicianUN);
    if(records) {
        let subs = await req.model.getSubscriptionsPhysician(physicianUN, physician.model)
        res.status(200).json(subs)
    }else throw new Error('Access Denied / page does not exist')
    } catch (e) {
    next(e.message)
    }
});

// diseaseRouter.get('/:model/:physicianUN/patients/:patientUN/:modelB', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {patientUN,model,modelB} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let records = await req.modelB.getByUN(patientUN);
//     const output = {
//         patientRecord: records
//     };
//     res.status(200).json(output);
//     } catch (e) {
//     next(e.message)
//     }
// });

// diseaseRouter.post('/:model/:physicianUN/patients/:patientUN/:modelB', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {patientUN,model,physicianUN} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let findUser = await patient.getByUN(patientUN);
//     if(findUser) {
//         req.body.patientUN = patientUN
//         req.body.physicianUN = physicianUN
//         let createRecords = await req.modelB.create(req.body);
//         const output = {
//             patientCreatedRecord: createRecords
//         };   
//         res.status(201).json(output);
//     }else throw new Error('patient not found')

    
//     } catch (e) {
//     next(e.message)
//     }
// });

// diseaseRouter.put('/:model/:physicianUN/patients/:patientUN/:modelB', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {patientUN,model,modelB,physicianUN} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let findUser = await patient.getByUN(patientUN);
//     if(findUser) {
//         req.body.physicianUN = physicianUN
//         let updateRecords = await req.modelB.updateByUN(patientUN,req.body);
//         const output = {
//             patientUpdatedRecord: updateRecords
//         };
//         res.status(202).json(output);
//     }else throw new Error('patient not found')
//     } catch (e) {
//     next(e.message)
//     }
// });
module.exports = subscriptionRouter;