const express=require('express')
const { RegisterController, LoginController } = require('../controllers/userController')

const router=express.Router()

router.post('/register', RegisterController)

router.post('/login',LoginController)

module.exports= router