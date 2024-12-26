const express= require("express")
const router = express.Router()

const {body}=require("express-validator")
const userControllers = require("../controllers/user.controller.js")

router.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
userControllers.registerUser)






module.exports=router;