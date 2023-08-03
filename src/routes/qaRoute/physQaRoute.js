// routes/physicianRoutes.js
const express = require('express');
const { QuestionAnswer } = require('../../models/index');

const physQaRouter = express.Router();

physQaRouter.get('/physician/Q&A', async (req, res) => {
    try {
      const allPosts = await QuestionAnswer.get();
      res.json(allPosts);
    } catch (error) {
      console.error('Error retrieving Q&A posts:', error);
      res.status(500).json({ message: 'Error retrieving Q&A posts' });
    }
  });

  physQaRouter.get('/physician/Q&A/:id', async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await QuestionAnswer.get(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error retrieving Q&A post:', error);
      res.status(500).json({ message: 'Error retrieving Q&A post' });
    }
  });

physQaRouter.put('/physician/Q&A/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await QuestionAnswer.get(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { title, description, status } = req.body;
    await post.update({ title, description, status });
    res.json(post);
  } catch (error) {
    console.error('Error updating Q&A post by physician:', error);
    res.status(500).json({ message: 'Error updating Q&A post by physician' });
  }
});


physQaRouter.delete('/physician/Q&A/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await QuestionAnswer.get(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.json({ message: 'Post deleted successfully by physician' });
  } catch (error) {
    console.error('Error deleting Q&A post by physician:', error);
    res.status(500).json({ message: 'Error deleting Q&A post by physician' });
  }
});

module.exports = physQaRouter;
