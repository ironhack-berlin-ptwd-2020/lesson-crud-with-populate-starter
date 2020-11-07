const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

// ****************************************************************************************
// GET route to display the form to create a new post
// ****************************************************************************************

// localhost:3000/post-create
router.get('/post-create', (req, res) => {

  User.find()
    .then(dbUsers => {
      res.render('posts/create', { dbUsers });
    })
    .catch(err => console.log(`Err while displaying post input page: ${err}`));
});

// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************

// <form action="/post-create" method="POST">

router.post('/post-create', (req, res) => {

  Post.create({ title: req.body.title, content: req.body.content, author: req.body.author }).then((myNewPost) => {
    console.log("this is the new post that got created: ", myNewPost)
    User.findByIdAndUpdate(req.body.author, { $push: { posts: myNewPost._id } }).then(() => {
      res.redirect('/post-create')
    })

  })

})

// ****************************************************************************************
// GET route to display all the posts
// ****************************************************************************************

router.get('/posts', (req, res) => {

  Post.find().populate('author')
    .then(dbPosts => {
      console.log('Posts from the DB: ', dbPosts);

      res.render('posts/list', { myPosts: dbPosts })
    })
    .catch(err => console.log(`Err while getting the posts from the DB: ${err}`));
});

// ****************************************************************************************
// GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************

// ... your code here

module.exports = router;
