const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(express.json());


const sequelize = new Sequelize('blogApp', 'root', 'Asif@1100', {
  host: "localhost",
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the MySQL database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

(async () => {
  try {
    await Post.sync({ force: true });
    console.log('Post model synchronized with the database');
  } catch (error) {
    console.error('Error synchronizing the Post model:', error);
  }
})();

app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating a new post:', error);
    res.status(500).json({ error: 'Failed to create a new post' });
  }
});


app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});


app.get('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching the blog post:', error);
    res.status(500).json({ error: 'Failed to fetch the blog post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error updating the blog post:', error);
    res.status(500).json({ error: 'Failed to update the blog post' });
  }
});


app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    await post.destroy();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting the blog post:', error);
    res.status(500).json({ error: 'Failed to delete the blog post' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
