const express = require("express");
const router = express.Router();
const bearerAuthphysician = require("../../middleware/auth/bearerPhysician");
const { QuestionAnswer, Comment } = require("../../models/index"); 
const modelMiddleware = require('../../middleware/routerModelling/routerModelling');
router.param('model', modelMiddleware)


router.post('/physician/:username/Q&A/:id/comments',bearerAuthphysician,addComments);
router.get('/physician/:username/Q&A/:id/comments',bearerAuthphysician,getComments);
router.get('/physician/:username/Q&A',bearerAuthphysician,getAllPosts);
router.put('/physician/:username/Q&A/:id/comments/:commentID',bearerAuthphysician,updateComments);
router.delete('/physician/:username/Q&A/:id/comments/:commentID',bearerAuthphysician,deleteComments);

//! add comment
async function addComments(req, res, next) {
  try{
    const {username, id}=req.params;
      let post = await QuestionAnswer.get(id)
      if(post){
        //if(status === 'solved') cant add any comments
        req.body.postID = id;
        req.body.author = username;
        let comment = await Comment.create(req.body)
        res.status(201).json(comment);
      }else throw new Error ('Post Not Found');
  }catch(err){
    next(err);
}}

//! get comment
async function getComments(req, res, next) {
  try{
    const {username, id}=req.params;
      //let post = await QuestionAnswer.get(id)
      let post = await QuestionAnswer.model.findOne({where:{id:id} , include : {
        model: Comment.model,
        as : 'Comments'
      } })
      if(post){
        //let comments = await post.getComments()
        res.status(200).json(post);
      }else throw new Error ('Post Not Found');
  }catch(err){
    next(err);
}}
async function getAllPosts(req, res, next) {
  try{
    const {username }=req.params;
      //let post = await QuestionAnswer.get(id)
      let post = await QuestionAnswer.model.findAll({ include : {
        model: Comment.model,
        as : 'Comments'
      } })
      if(post){
        //let comments = await post.getComments()
        res.status(200).json(post);
      }else throw new Error ('Post Not Found');
  }catch(err){
    next(err);
}}

//! update comment
async function updateComments(req, res, next) {
  try{
    const { username, id,commentID}=req.params;
      let post = await QuestionAnswer.get(id)
      if(post){
        //if(status === 'solved') cant add any comments
        let comment = await Comment.get(commentID)
        if(comment.author === username) {
          let updatedComment =  await Comment.update(commentID,req.body)
          res.status(202).json(updatedComment);
        }else{
          throw new Error ('Access denied')
        }
      }else throw new Error ('Post Not Found');
  }catch(err){
    next(err);
}}

//! delete comment
async function deleteComments(req, res, next) {
  try{
    const { username, id,commentID}=req.params;
      let post = await QuestionAnswer.get(id)
      if(post){
        //if(status === 'solved') cant add any comments
        let comment = await Comment.get(commentID)
        if(comment){
          if(comment.author === username) {
            let deleteComment =  await Comment.delete(commentID)
            res.status(201).json(`Message : Comment (${comment.text}) deleted successfully`);
          }else{
            throw new Error ('Access denied')
          }
        }else throw new Error ('Comment Not Found');
        
      }else throw new Error ('Post Not Found');
  }catch(err){
    next(err);
}}



module.exports = router;
