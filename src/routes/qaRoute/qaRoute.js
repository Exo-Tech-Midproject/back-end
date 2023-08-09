// // ! routes/qaRoutes.js
// const express = require('express');
// const { QuestionAnswer } = require('../../models/index');
// const bearerAuth = require('../../middleware/auth/bearer')
// const modelMiddleware = require('../../middleware/routerModelling/routerModelling');
// const qaRouter = express.Router();
// qaRouter.param('model', modelMiddleware)

// //! create a new post
// qaRouter.post('/:model/profile/:username/Q&A',bearerAuth, async (req, res) => {
//   const {model} = req.params;

//     try {
      
//       if(model === 'patient'){
//         req.body.craetedBy=req.params.username;
//         const newPost = await QuestionAnswer.create(req.body);
//       res.status(201).json(newPost);
//       }else{
//         res.status(404).json({message : 'Sorry, The patient only can craete a post'});
//       }
      
//     } catch (error) {
//       console.error('Error creating Q&A post:', error);
//       res.status(500).json({ message: 'Error creating Q&A post' });
//     }
// });

// //! get all posts 
// qaRouter.get('/:model/profile/:username/Q&A',bearerAuth, async (req, res) => {
//   try {
//     const allPosts = await QuestionAnswer.get();
//     res.json(allPosts);
//   } catch (error) {
//     console.error('Error retrieving Q&A posts:', error);
//     res.status(500).json({ message: 'Error retrieving Q&A posts' });
//   }
// });

// //! get post bt id 
// qaRouter.get('/:model/profile/:username/Q&A/:id',bearerAuth, async (req, res) => {
//   const postId = req.params.id;
//   try {
//     const post = await QuestionAnswer.get(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json(post);
//   } catch (error) {
//     console.error('Error retrieving Q&A post:', error);
//     res.status(500).json({ message: 'Error retrieving Q&A post' });
//   }
// });

// //! update a post
// qaRouter.put('/:model/profile/:username/Q&A/:id',bearerAuth, async (req, res) => {
 
//   const {username} = req.params;
//   const postId = req.params.id;
//   const { text } = req.body;
  
//   try {
//     const post = await QuestionAnswer.get(postId);
//     console.log(post.craetedBy);
//     const {model} = req.params;
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     if(model === 'patient' && post.craetedBy === username ){
//       const { title, description} = req.body;
//       await post.update({ title, description});
//       res.json(post);
    
//     }else{
//       res.status(404).json({ message: 'Access Denied' });
//     }
//   } catch (error) {
//     console.error('Error updating Q&A post:', error);
//     res.status(500).json({ message: 'Error updating Q&A post' });
//   }
// });

// //! delete a post
// qaRouter.delete('/:model/profile/:username/Q&A/:id',bearerAuth, async (req, res) => {
//   const postId = req.params.id;
//   const {username} = req.params;
//   const {model} = req.params;
//   try {
//       const post = await QuestionAnswer.get(postId);
//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }
//       if(model === 'patient' && post.craetedBy === username ){
//         await post.destroy();
//       res.json({ message: 'Post deleted successfully' });
//       }else{
//         res.json({ message: 'You cant delete the post' });
//       }
      
//   } catch (error) {
//     console.error('Error deleting Q&A post:', error);
//     res.status(500).json({ message: 'Error deleting Q&A post' });
//   }
// });

// module.exports = qaRouter;
