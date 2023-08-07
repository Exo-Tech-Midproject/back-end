'use strict';

const express = require('express');
const { group , patient } = require('../../models');
const groupRouter = express.Router();

groupRouter.get('/group', getGroup);
groupRouter.get('/group/:id', getOneGroup);
groupRouter.put('/group/:id', updateGroup);
groupRouter.delete('/group/:id', deleteGroup);
groupRouter.post('/group', createGroup);
groupRouter.post('/group/:id/:username', addMembersToGroups);


async function addMembersToGroups(req , res , next ){
    try{
    const { id , username } = req.params

    const userFound = await patient.getByUN(username)
    const foundGroup = await group.get(id)
    const addMembers = await foundGroup.addMember(userFound)
    res.status(201).json(addMembers)
    }catch(error){
        next(error)
    }
} 

async function getGroup(req, res) {
    const allOrder = await group.get();
    res.status(200).json(allOrder);
}

async function getOneGroup(req, res ) {
    const id = req.params.id;
    const oneGroup = await group.get(id);
    res.status(200).json(oneGroup)
}


async function createGroup(req, res ,next) {
    try{
        const obj = req.body;
        const createGroup = await group.create(obj);
        res.status(201).json(createGroup)
    }catch(error){
        next('physician not found')
    }
}

async function updateGroup(req, res) {
    const id = req.params.id;
    const obj = req.body;

    const updateGroup = await group.update(id, obj)

    res.status(202).json(updateGroup);

}

async function deleteGroup(req, res) {
    const id = req.params.id;
    const deletedOrder = await group.delete(id);
    res.status(204).json(deletedOrder);
}

// Add a patient to a group
groupRouter.post('/patient/:patientId/group/:groupId', async (req, res) => {
    const { patientId, groupId } = req.params;
    try {
    const Patient = await patient.findByPk(patientId);
    const Group = await group.findByPk(groupId);

    if (!Patient || !Group) {
        return res.status(404).json({ error: 'Patient or Group not found' });
    }

    await Patient.addGroup(Group);
    return res.status(201).json({ message: 'Patient added to group' });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = groupRouter;