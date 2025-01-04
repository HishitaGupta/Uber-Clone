const blacklistTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')

module.exports.registerCaptain=async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const {fullname,email,password,vehicle}=req.body
        const isCaptainAlreadyExist = await captainModel.findOne({email})
        if(isCaptainAlreadyExist){
            return res.status(400).json({error:"Captain already exists"})
        }
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        })
        const token = captain.generateAuthToken()
        res.status(201).json({token,captain})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports.loginCaptain=async(req,res,next)=>{ 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const {email,password}=req.body
        const captain = await captainModel.findOne({email}).select("+password")
        console.log(captain);
        if(!captain){
            return res.status(401).json({error:"Invalid Email or Passwordcaptain not found"})
        }
        const isMatch = await captain.comparePassword(password)
        console.log(isMatch);
        if(isMatch){
            return res.status(401).json({error:"Invalid Email or Password password not matched"})
        }
        const token = captain.generateAuthToken()
        res.cookie("token",token)
        res.status(200).json({token,captain})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports.getCaptainProfile=async(req,res,next)=>{
    try {
        res.status(200).json({captain:req.captain})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports.logoutCaptain=async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    await blacklistTokenModel.create({token})


    res.clearCookie("token")

    res.status(200).json({message:"Logged out successfully"})
}