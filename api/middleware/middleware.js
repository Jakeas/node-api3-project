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
   next()
    } else {
      return res.status(404).json({message: "No user with that id, yo"})
    }
  })
  .catch(err=>res.status(500).json({message: "server error"}))
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const valUser = req.body
  if(!valUser.name){
    res.status(422).json("Needs a name")
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

  module.exports = {logger, validateUserId,validateUser, validatePost} 