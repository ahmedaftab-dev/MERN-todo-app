const express=require('express')
const { TestingController } = require('../controllers/TestController')

const router=express.Router()

router.get('/', TestingController)

module.exports = router