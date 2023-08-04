'use strict'

const express = require('express');
const diseaseRouter = express.Router();
// const basicAuth = require('../../middleware/auth/basic')
const bearerAuth = require('../../middleware/auth/bearer')

// const models = require('../../models/index')
const modelMiddleware = require('../../middleware/routerModelling/routerModelling')
const modelMiddleware2 = require('../../middleware/routerModelling/routerModelling2')
const {disease, patient,prescription} = require('../../models/index')

diseaseRouter.param('model', modelMiddleware);
diseaseRouter.param('modelB', modelMiddleware2);
// diseaseRouter.param('modelB', modelMiddleware);

// diseaseRouter.param('model', modelMiddleware);


// diseaseRouter.get('/:model/:username/diseases', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     console.log(model)
//     if(model !== 'patient') throw new Error('Access Denied')
//     let records = await disease.getByUN(username);
//     if(records) {

//         const output = {
//             patientRecord: records
//         };
//         res.status(200).json(output);
//     }else throw new Error('There are no records for this patient')
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.get('/:model/:username/prescriptions', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     console.log(model)
//     if(model !== 'patient') throw new Error('Access Denied')
//     let records = await prescription.getByUN(username);
//     if(records) {

//         const output = {
//             patientRecord: records
//         };
//         res.status(200).json(output);
//     }else throw new Error('There are no records for this patient')
//     } catch (e) {
//     next(e.message)
//     }
// });

// diseaseRouter.get('/:model/all-diseases', bearerAuth, async (req, res, next) => {
//     try {
//     let records = await disease.get();
//     const output = {
//         patientRecord: records
//     };
//     res.status(200).json(output);
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.get('/:model/patient/:username/diseases', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let records = await disease.getByUN(username);
//     const output = {
//         patientRecord: records
//     };
//     res.status(200).json(output);
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.get('/:model/patient/:username/prescriptions', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let records = await prescription.getByUN(username);
//     const output = {
//         patientRecord: records
//     };
//     res.status(200).json(output);
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.post('/:model/patient/:username/diseases', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let findUser = await patient.getByUN(username);
//     if(findUser) {
//         let createRecords = await disease.create(req.body);
//         const output = {
//             patientCreatedRecord: createRecords
//         };   
//         res.status(201).json(output);
//     }else throw new Error('patient not found')

    
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.post('/:model/patient/:username/prescriptions', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let findUser = await patient.getByUN(username);
//     if(findUser) {
//         let createRecords = await prescription.create(req.body);
//         const output = {
//             patientCreatedRecord: createRecords
//         };   
//         res.status(201).json(output);
//     }else throw new Error('patient not found')

    
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.put('/:model/patient/:username/diseases', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let findUser = await patient.getByUN(username);
//     if(findUser) {
//         let updateRecords = await disease.updatebyUN(username,req.body);
//         const output = {
//             patientUpdatedRecord: updateRecords
//         };
//         res.status(202).json(output);
//     }else throw new Error('patient not found')
//     } catch (e) {
//     next(e.message)
//     }
// });
// diseaseRouter.put('/:model/patient/:username/prescriptions', bearerAuth, async (req, res, next) => {
//     try {
//         // req.body.username = req.body.username.toLowerCase()
//     let {username,model} = req.params
//     if(model !== 'physician') throw new Error('Access Denied')
//     let findUser = await patient.getByUN(username);
//     if(findUser) {
//         let updateRecords = await prescription.updatebyUN(username,req.body);
//         const output = {
//             patientUpdatedRecord: updateRecords
//         };
//         res.status(202).json(output);
//     }else throw new Error('patient not found')
//     } catch (e) {
//     next(e.message)
//     }
// });

// diseaseRouter.get('/:model/secret',bearerAuth, async (req, res, next) => {
//     let users = await req.model.get()
//     res.status(200).json(users)
// });




diseaseRouter.get('/:model/:username/:modelB', bearerAuth, async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
    let {username,model,modelB} = req.params
    // console.log(model)
    if(model !== 'patient') throw new Error('Access Denied')
    let records = await req.modelB.getByUN(username);
    if(records) {

        const output = {
            patientRecord: records
        };
        res.status(200).json(output);
    }else throw new Error('There are no records for this patient')
    } catch (e) {
    next(e.message)
    }
});

diseaseRouter.get('/:model/patients/:username/:modelB', bearerAuth, async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
    let {username,model,modelB} = req.params
    if(model !== 'physician') throw new Error('Access Denied')
    let records = await req.modelB.getByUN(username);
    const output = {
        patientRecord: records
    };
    res.status(200).json(output);
    } catch (e) {
    next(e.message)
    }
});

diseaseRouter.post('/:model/patients/:username/:modelB', bearerAuth, async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
    let {username,model} = req.params
    if(model !== 'physician') throw new Error('Access Denied')
    let findUser = await patient.getByUN(username);
    if(findUser) {
        req.body.username = username
        let createRecords = await req.modelB.create(req.body);
        const output = {
            patientCreatedRecord: createRecords
        };   
        res.status(201).json(output);
    }else throw new Error('patient not found')

    
    } catch (e) {
    next(e.message)
    }
});

diseaseRouter.put('/:model/patients/:username/:modelB', bearerAuth, async (req, res, next) => {
    try {
        // req.body.username = req.body.username.toLowerCase()
    let {username,model,modelB} = req.params
    if(model !== 'physician') throw new Error('Access Denied')
    let findUser = await patient.getByUN(username);
    if(findUser) {
        let updateRecords = await req.modelB.updatebyUN(username,req.body);
        const output = {
            patientUpdatedRecord: updateRecords
        };
        res.status(202).json(output);
    }else throw new Error('patient not found')
    } catch (e) {
    next(e.message)
    }
});
module.exports = diseaseRouter;