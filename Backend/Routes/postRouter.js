const express = require('express');
const connection = require('../Config/db');

const postRouter = express.Router();

connection.connect((error) => {
    if (error) {
      console.error('Failed to connect to PlanetScale:', error);
      return;
    }
    console.log('Connected to PlanetScale!');


postRouter.post('/', (req, res) => {
  const { title, message, creator, tags, selectedFile } = req.body;
  const query = 'INSERT INTO posts (title, message, creator, tags, selectedFile) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, message, creator, tags, selectedFile], (err, result) => {
    if (err) {
      console.error('Error creating a new post:', err);
      res.status(500).json({ error: 'Failed to create a new post' });
      return;
    }
    res.status(201).json({ id: result.insertId, title, message, creator, tags, selectedFile });
  });
});


postRouter.get('/', (req, res) => {
  const query = 'SELECT * FROM posts';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching blog posts:', err);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
      return;
    }
    res.json(results);
  });
});


postRouter.get('/:id', (req, res) => {
  const postId = req.params.id;
  const query = 'SELECT * FROM posts WHERE id = ?';
  connection.query(query, [postId], (err, results) => {
    if (err) {
      console.error('Error fetching the blog post:', err);
      res.status(500).json({ error: 'Failed to fetch the blog post' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(results[0]);
  });
});


postRouter.put('/:id', (req, res) => {
  const postId = req.params.id;
  const { title, message, creator, tags, selectedFile } = req.body;
  const query = 'UPDATE posts SET title = ?, message = ?, creator = ?, tags = ?, selectedFile = ? WHERE id = ?';
  connection.query(query, [title, message, creator, tags, selectedFile, postId], (err) => {
    if (err) {
      console.error('Error updating the blog post:', err);
      res.status(500).json({ error: 'Failed to update the blog post' });
      return;
    }
    res.json({ id: postId, title, message, creator, tags, selectedFile });
  });
});


postRouter.delete('/:id', (req, res) => {
  const postId = req.params.id;
  const query = 'DELETE FROM posts WHERE id = ?';
  connection.query(query, [postId], (err) => {
    if (err) {
      console.error('Error deleting the blog post:', err);
      res.status(500).json({ error: 'Failed to delete the blog post' });
      return;
    }
    res.json({ message: 'Blog post deleted successfully' });
  });
});
})

module.exports = {
  postRouter,
};
