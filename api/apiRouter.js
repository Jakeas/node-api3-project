const router = require('express').Router()
const UsersRouter = require('./users/users-router')

router.use('/users', UsersRouter)

router.get('/', (req, res)=>{
    res.status(200).json({message: "You made it to the api router"})
})

module.exports = router