const express = require('express');
const { authUser, authCaptain } = require('../middlewares/auth.middleware');
const router = express.Router();
const { body, query } = require('express-validator');
const { createRide, getFare, confirmRide,startRide,endRide } = require('../controllers/ride.controller');

router.post("/create",
    authUser,
    // body("userId").isString().isLength({min: 24,max:24}).withMessage("Invalid User Id"),
    body("pickup").isString().withMessage("Invalid Pickup Address"),
    body("destination").isString().withMessage("Invalid Destination Address"),
    body("vehicleType").isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid Vehicle Type"),
    createRide)


router.get("/get-fare",
    authUser,

    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination Address"),

    getFare)

router.post("/confirm",
    authCaptain,

    body('rideId').isMongoId().withMessage("Invalid Ride Id"),

    confirmRide)

router.get("/start-ride",
    authCaptain,

    query('rideId').isMongoId().withMessage("Invalid Ride Id"),
    query('otp').isString().isLength({min:6,max:6}).withMessage("Invalid Ride Id"),

    startRide)


    router.post("/end-ride",
        authCaptain,
    
        body('rideId').isMongoId().withMessage("Invalid Ride Id"),
        
    
        endRide)




module.exports = router;