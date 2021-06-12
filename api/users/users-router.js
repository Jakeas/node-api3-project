const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const {logger, validateUserId,validateUser, validatePost} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(allUsers => {
  res.status(200).json(allUsers)  
  })
  .catch(err=>res.status(500).json({message: "server error"}))
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const {id} = req.params
  Users.getById(id)
  .then(foundUser => {
    if(foundUser){
      return res.status(200).json({message: foundUser})
    } else {
      return res.status(404).json({message: "No user with that id"})
    }
  })
  .catch(err=>res.status(500).json({message: "server error"}))
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const user = req.body
  Users.insert(user)
    .then(createdUser => res.status(201).json({message:createdUser}))
    .catch(err=>res.status(500).json({message: "server error", err}))
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params
  const updatedUser = req.body
  Users.update(id, updatedUser)
    .then(updated=>{
      if(updated){
        return res.status(200).json({message:updated})
      } else{
        return res.status(404).json({message:"No user with that id"})
      }
    })
    .catch(err=>res.status(500).json({message: "server error"}))
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const {id} = req.params
  Users.remove(id)
  .then(deletedUser=>{
    if(deletedUser){
      return res.status(200).json({message: deletedUser})
    } else {
      res.status(404).json({message: "No user with that id"})
    }
  })
  .catch(err=>res.status(500).json({message:"server error"}))
});

router.get('/:id/posts', validateUserId,(req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params
  Posts.getUserPosts(id)
    .then(foundPost => {
      if(foundPost){
        return res.status(200).json({message: foundPost})
      } else {
        return res.status(404).json({message:"No post with that id"})
      }
    })
    .catch(err=>res.status(500).json({message: "server error"}))
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id}=req.params
  Posts.insert(id)
    .then(createdPost=> res.status(201).json({message:createdPost}))
    .catch(err=>res.status(500).json({message:"server error"}))
  });

// do not forget to export the router
module.exports = router;