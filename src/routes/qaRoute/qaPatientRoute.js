// ! routes/qaRoutes.js
const express = require('express');
const { QuestionAnswer, patient, Comment } = require('../../models/index');
const bearerAuthPatient = require('../../middleware/auth/bearerPatient')
// const modelMiddleware = require('../../middleware/routerModelling/routerModelling');
const qaRouter = express.Router();
// qaRouter.param('model', modelMiddleware)


qaRouter.post('/patient/:username/Q&A',bearerAuthPatient, addQApostByPatient)
qaRouter.get('/patient/:username/Q&A', bearerAuthPatient,getAllQApostsByPatient)
qaRouter.get('/patient/:username/Q&A:id',bearerAuthPatient, getOneQApostByPatientbyId)
qaRouter.put('/patient/:username/Q&A/:id', bearerAuthPatient, updateOneQApostByPatientbyId)
qaRouter.delete('/patient/:username/Q&A/:id',bearerAuthPatient, deleteOneQApostByPatientbyId)

//! create a new post
async function addQApostByPatient (req, res) {

    try {
      
        const { username } = req.params
        const patientFound = await patient.getByUN(username);

        if(patientFound){

            req.body.craetedBy = username;
            const newPost = await QuestionAnswer.create(req.body);
            res.status(201).json(newPost);
            
        }else throw new Error(`This patient doesn't exist`)
      
      
    } catch (error) {
      next(error)
    }
};

//! get all posts 
async function getAllQApostsByPatient(req, res) {
    try {
        const { username } = req.params
        const patientFound = await patient.getByUN(username);
        if(patientFound) {

            const allPosts = await QuestionAnswer.model.findAll({
                where: {
                    craetedBy: username
                }
            });
            if(allPosts[0]) {
                res.json(allPosts);
            } else throw new Error(`You didn't post anything yet`)

        } else throw new Error(`This patient doesn't exist`)
    } catch (error) {
        next(error)
    }
};

//! get post bt id 
async function getOneQApostByPatientbyId (req, res) {
    try {
      const { username, id } = req.params
      const patientFound = await patient.getByUN(username);
      if(patientFound) {

          const post = await QuestionAnswer.model.findOne({
            where:{
                id:id,
                craetedBy:username
            },
            include: {
                model: Comment.model,
                as: 'Comments'
            }
          });
          if (!post) new Error(`Post doesn't exist`)
          res.status(200).json(post);

      } throw new Error(`This patient doesn't exist`)


  } catch (error) {
    next(error)
  }
};

//! update a post
async function updateOneQApostByPatientbyId (req, res, next)  {


    try {
        const { username, id } = req.params
        const patientFound = await patient.getByUN(username);


        if (!patientFound) throw new Error(`This patient doesn't exist`)

        const post = await QuestionAnswer.model.findOne({
            where: {
                id: id,
                craetedBy: username
            }
        });


        if (!post) throw new Error(`This post doesn't exist`)

        req.body.craetedBy = username
        await post.update(req.body);
        res.status(202).json(post);


    } catch (error) {
        next(error)
    }
};

//! delete a post
 async function deleteOneQApostByPatientbyId (req, res)  {
    try {
        const { username, id } = req.params
        const patientFound = await patient.getByUN(username);


        if (!patientFound) throw new Error(`This patient doesn't exist`)

        const post = await QuestionAnswer.model.findOne({
            where: {
                id: id,
                craetedBy: username
            }
        });


        if (!post) throw new Error(`This post doesn't exist`)


        await QuestionAnswer.deletedelete(id);
        res.status(200).json(`Post with id ${id} has been deleted successfully.`);


    } catch (error) {
        next(error)
    }
};

module.exports = qaRouter;
