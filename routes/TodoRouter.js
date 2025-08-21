const express=require("express")
const {CreateTodoController} = require("../controllers/TodoController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

const router=express.Router()

router.post("/create",AuthMiddleware,CreateTodoController)

module.exports = router