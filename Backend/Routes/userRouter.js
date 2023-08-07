const express = require('express');
const {connection} = require('../Config/db');

const userRouter = express.Router();

const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  

  (async () => {
    try {
      await User.sync({ force: true });
      console.log('User model synchronized with the database');
    } catch (error) {
      console.error('Error synchronizing the User model:', error);
    }
  })();
  
  userRouter.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Failed to signup' });
    }
  });
  

  userRouter.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      if (user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
  
      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });
  

  module.exports={
    userRouter
  }