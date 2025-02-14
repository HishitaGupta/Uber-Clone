const userModel= require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser=async(req,res,next)=>{
    const token= req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isBlacklisted= await blacklistTokenModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)//decoded mein user ka id aayega
        // console.log(decoded);
        
        const user = await userModel.findById(decoded._id)

        req.user=user;
        console.log("req.user:",req.user);
        

        return next()
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }

}


module.exports.authCaptain=async(req,res,next)=>{
    const token= req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("token in middleware:",token)
    if(!token){
        return res.status(401).json({message:"Unauthorized (token)"})
    }

    const isBlacklisted= await blacklistTokenModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized (blacklisted)"})
    }

  

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // console.log("Decoded token of captain:",decoded);
        
        const captain = await captainModel.findById(decoded.id)

        // console.log("Captain:",captain);
        
       
        

        req.captain=captain;

        return next()
       
    }catch(err){
        return res.status(401).json({message:"Unauthorized(err)"})
    }

   
}
