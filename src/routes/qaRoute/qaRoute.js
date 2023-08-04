// routes/qaRoutes.js
const express = require('express');
const { QuestionAnswer } = require('../../models/index');

const qaRouter = express.Router();


qaRouter.post('/Q&A', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = await QuestionAnswer.create({
      title,
      description,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating Q&A post:', error);
    res.status(500).json({ message: 'Error creating Q&A post' });
  }
});


qaRouter.get('/Q&A', async (req, res) => {
  try {
    const allPosts = await QuestionAnswer.get();
    res.json(allPosts);
  } catch (error) {
    console.error('Error retrieving Q&A posts:', error);
    res.status(500).json({ message: 'Error retrieving Q&A posts' });
  }
});


qaRouter.get('/Q&A/:id', async (req, res) => {
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


qaRouter.put('/Q&A/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await QuestionAnswer.get(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { title, description } = req.body;
    await post.update({ title, description });
    res.json(post);
  } catch (error) {
    console.error('Error updating Q&A post:', error);
    res.status(500).json({ message: 'Error updating Q&A post' });
  }
});

module.exports = qaRouter;
