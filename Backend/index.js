const express = require("express");
// const { postRouter } = require("./Routes/postRouter");
// const { connection } = require("./Config/db");
// const { userRouter } = require("./Routes/userRouter");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const mysql = require('mysql2');
const cors=require("cors")

require('dotenv').config()

const connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express();
app.use(cors())
const port = 3001;

app.use(express.json());

connection.connect((error) => {
    if (error) {
      console.error('Failed to connect to PlanetScale:', error);
      return;
    }
    console.log('Connected to PlanetScale!');


      // Middleware to verify guest token
  const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Access denied.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.userId = decoded.userId;
   

      next();
    });
  };

  







// home route
    app.get("/",async(req,res)=>{
        res.send("Welocme to BlogApp")
    })
    
// user route
    
  app.post('/register', (req, res) => {
    const { name, email, password, gender, profilepicture} = req.body;

  
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.error('Failed to hash password:', error);
        res.status(500).json({ message: 'Failed to register user' });
        return;
      }

      const query = 'INSERT INTO bloguser (name, email, password, role, gender, profilepicture) VALUES (?, ?, ?, ?, ?, ?)';
      const role = 'user'; 
      connection.query(query, [name, email, hashedPassword, role, gender, profilepicture], (error) => {
        if (error) {
          console.error('Failed to register user:', error);
          res.status(500).json({ message: 'Failed to register user' });
        } else {
          res.status(201).json({ message: 'User registered successfully',name,success:true});
        }
      });
    });
  });



  app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM bloguser WHERE email = ?';
    connection.query(query, [email], (error, results) => {
      if (error) {
        console.error('Failed to fetch user:', error);
        res.status(500).json({ message: 'Failed to authenticate user' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const user = results[0];
      

 
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          console.error('Failed to compare passwords:', error);
          res.status(500).json({ message: 'Failed to authenticate user' });
        } else if (isMatch) {
      
          const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
          const query1='SELECT name FROM bloguser WHERE email = ?';
           connection.query(query1, [email], (error, results) => {
          const data=results[0]
          res.status(200).json({ success: true, token , data});
           })
          
        } else {
  
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    });
  });



// post routes 
  app.post('/post',verifyUserToken, (req, res) => {
    const { title, message, creator, tags, Image } = req.body;
    const tagsString = tags.join(', '); 
    const query = 'INSERT INTO posts (title, message, creator, tags, Image) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [title, message, creator, tagsString, Image], (err, result) => {
      if (err) {
        console.error('Error creating a new post:', err);
        res.status(500).json({ error: 'Failed to create a new post' });
        return;
      }
      res.status(201).json({ id: result.insertId, title, message, creator, tags, Image });
    });
});


app.get('/post', (req, res) => {
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


app.get('/post/:id', (req, res) => {
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


app.put('/post/:id', (req, res) => {
  const postId = req.params.id;
  const { title, message, creator, tags, Image } = req.body;
  const query = 'UPDATE posts SET title = ?, message = ?, creator = ?, tags = ?, Image = ? WHERE id = ?';
  connection.query(query, [title, message, creator, tags, Image, postId], (err) => {
    if (err) {
      console.error('Error updating the blog post:', err);
      res.status(500).json({ error: 'Failed to update the blog post' });
      return;
    }
    res.json({ id: postId, title, message, creator, tags, Image });
  });
});


app.delete('/post/:id', (req, res) => {
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

// app.use("/user",userRouter)

// app.use("/posts",postRouter)

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
