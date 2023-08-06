const express = require("express");
const router = express.Router();
const bearerAuth = require("../../middleware/auth/bearer");
const { QuestionAnswer, Comment } = require("../../models/index"); 
const modelMiddleware = require('../../middleware/routerModelling/routerModelling');
router.param('model', modelMiddleware)


router.post('/:model/profile/:username/Q&A/:id/comments',bearerAuth,addComments);
router.get('/:model/profile/:username/Q&A/:id/comments',bearerAuth,getComments);
router.put('/:model/profile/:username/Q&A/:id/comments/:commentID',bearerAuth,updateComments);
router.delete('/:model/profile/:username/Q&A/:id/comments/:commentID',bearerAuth,deleteComments);

//! add comment
async function addComments(req, res, next) {
  try{
    const {model, username, id}=req.params;
    if(model === 'physician'){
      let post = await QuestionAnswer.get(id)
      if(post){
        //if(status === 'solved') cant add any comments
        req.body.postID = id;
        req.body.author = username;
        let comment = await Comment.create(req.body)
        res.status(201).json(comment);
      }else throw new Error ('Post Not Found');
    }else throw new Error ('Access denied')
  }catch(err){
    next(err);
}}

//! get comment
async function getComments(req, res, next) {
  try{
    const {model, username, id}=req.params;
    if(model === 'physician'){
      //let post = await QuestionAnswer.get(id)
      let post = await QuestionAnswer.model.findOne({where:{id:id} , include : {
        model: Comment.model,
        as : 'Comments'
      } })
      if(post){
        //let comments = await post.getComments()
        res.status(200).json(post);
      }else throw new Error ('Post Not Found');
    }else throw new Error ('Access denied')
  }catch(err){
    next(err);
}}

//! update comment
async function updateComments(req, res, next) {
  try{
    const {model, username, id,commentID}=req.params;
    if(model === 'physician' ){
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
    }else throw new Error ('Access denied')
  }catch(err){
    next(err);
}}

//! delete comment
async function deleteComments(req, res, next) {
  try{
    const {model, username, id,commentID}=req.params;
    if(model === 'physician' ){
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
    }else throw new Error ('Access denied')
  }catch(err){
    next(err);
}}

// //! add comment
// router.post(
//   "/:model/profile/:username/Q&A/:id/comments",
//   async (req, res) => {
//     try {
//       const { model } = req.params.model;
//       const postId = req.params.id;
//       req.body.postID = postId;
    
//         const questionAnswer = await QuestionAnswer.model.findOne({
//           where: { postID: postId },
//         });
//         if (!questionAnswer) {
//           return res.status(404).json({ message: "QuestionAnswer not found" });
//         }
//         if (model === "physician") {
//           console.log(`${model}*********************************************************************`)
//         req.body.author = req.params.username;
//         const comment = await Comment.create(req.body);
//         await questionAnswer.addComment(comment);

//         res
//           .status(201)
//           .json({ message: "Comment created successfully", comment: comment });
//       }
//     } catch (error) {
//       console.error("Error creating comment:", error);
//       res.status(500).json({ message: "Error creating comment" });
//     }
//   }
// );

// //! get comment
// router.get("/:model/profile/:username/Q&A/:id/comments", async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const questionAnswer = await QuestionAnswer.model.findOne(
//       { where: { postID: postId } },
//       {
//         include: Comment,
//       }
//     );
//     const answer = await questionAnswer.getComments();
//     if (!questionAnswer) {
//       return res.status(404).json({ message: "QuestionAnswer not found" });
//     }
//     //res.status(200).json(questionAnswer);
//     res.status(200).json(answer);
//   } catch (error) {
//     console.error("Error retrieving comments:", error);
//     res.status(500).json({ message: "Error retrieving comments" });
//   }
// });

// //! update comment
// router.put(
//   "/:model/profile/:username/Q&A/:id/comments/:commentId",
//   async (req, res) => {
//     try {
//       const commentId = req.params.commentId;
//       const newText = req.body.text;

//       const comment = await Comment.get(commentId);

//       if (!comment) {
//         return res.status(404).json({ message: "Comment not found" });
//       }

//       comment.text = newText;
//       await comment.save();

//       res.json({ message: "Comment updated successfully" });
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       res.status(500).json({ message: "Error updating comment" });
//     }
//   }
// );

// //! delete comment
// router.delete(
//   "/:model/profile/:username/Q&A/:id/comments/:commentId",
//   async (req, res) => {
//     try {
//       const commentId = req.params.commentId;

//       const comment = await Comment.get(commentId);

//       if (!comment) {
//         return res.status(404).json({ message: "Comment not found" });
//       }

//       await comment.destroy();

//       res.json({ message: "Comment deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       res.status(500).json({ message: "Error deleting comment" });
//     }
//   }
// );

module.exports = router;
