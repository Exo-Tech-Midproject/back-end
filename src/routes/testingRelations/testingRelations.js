'use strict'

const express = require('express');
const { patient, disease, physician } = require('../../models');
const bearer = require('../../middleware/auth/bearer');
const routerModelling = require('../../middleware/routerModelling/routerModelling');
const relationRouter = express.Router();


relationRouter.param('model',routerModelling)

relationRouter.get('/allUsersHistory', handleAllUsers)
relationRouter.get('/allPhysicianCreatedHistory', handleAllphysicianHistory)
relationRouter.get('/profile/:model/:physicianUN/CreatedHistory',bearer ,handleOnephysicianHistory)
relationRouter.get('/profile/:model/:physicianUN/:patientUN/subscribe',bearer ,handleSubscirbe)


async function handleAllUsers(req,res) {
    let allHistory = await patient.getRelatedData(disease.model)

    res.status(200).json(allHistory)
}
async function handleAllphysicianHistory(req,res) {
    let allHistory = await physician.getRelatedDataPhysician(disease.model)

    res.status(200).json(allHistory)
}
async function handleOnephysicianHistory(req,res,next) {
    const {model,physicianUN} = req.params
    try {
        if(model !== 'physician') throw new Error('Access denied')

        let allHistory = await physician.getRelatedDataOnePhysician(physicianUN,disease.model)
    
        res.status(200).json(allHistory)
    } catch(err){
        next(err)
    }
}
async function handleSubscirbe(req,res,next) {
    const {model,physicianUN,patientUN} = req.params
    try {
        if(model !== 'physician') throw new Error('Access denied')
        console.log(patientUN,physicianUN,model)
        let physicianName = await physician.getByUN(physicianUN)
        let patientName = await patient.getByUN(patientUN)
        console.log(physicianName,patientName)
        await physicianName.addSubscriber(patientName)
        let result = await physicianName.getSubscriber({
            attributes: ['username' ,'mobileNumber', 'emailAddress', 'gender', 'fullName']
        }) 
        
    
        res.status(200).json(result)
    } catch(err){
        next(err)
    }
}


module.exports = relationRouter