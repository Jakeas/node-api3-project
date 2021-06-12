const Users = require('../users/users-model')
// const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  console.log('logging')
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params
  Users.getById(id)
  .then(foundUser => {
    if(foundUser){
      req.body.user = foundUser
      next()
    } else {
      return res.status(404).json({message: "User not found"})
    }
  })
  .catch(err=>res.status(500).json({message: "server error"}))
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const valUser = req.body
  if(valUser === {} || !valUser.name){
    res.status(400).json({message: "Missing required name"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const valPost = req.body
  if(!valPost.text || !valPost.postedBy){
    res.status(422).json("Needs text and posted by")
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules

  module.exports = {logger, validateUserId,validateUser, validatePost} 