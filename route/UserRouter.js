const express=require("express")
const UserController=require("../App/Controller/UserController")


const UserRouter=express.Router()

UserRouter.get("/",UserController.home)
UserRouter.get("/createuser",UserController.createuserForm)
UserRouter.post("/create/user",UserController.createuser)
UserRouter.get('/loginForm',UserController.loginForm)
UserRouter.post('/userlogin',UserController.userlogin)
UserRouter.get("/logout",UserController.logout)


module.exports=UserRouter
