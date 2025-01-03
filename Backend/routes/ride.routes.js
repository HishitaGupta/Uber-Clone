const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const router = express.Router();
const {body,query} = require('express-validator');
const { createRide, getFare } = require('../controllers/ride.controller');

router.post("/create",
    authUser ,
    // body("userId").isString().isLength({min: 24,max:24}).withMessage("Invalid User Id"),
    body("pickup").isString().withMessage("Invalid Pickup Address"),
    body("destination").isString().withMessage("Invalid Destination Address"),
    body("vehicleType").isString().isIn(['auto','car','motorcycle']).withMessage("Invalid Vehicle Type"),
    createRide)


router.get("/get-fare",
        authUser ,
       
        query("pickup").isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
        query("destination").isString().isLength({min:3}).withMessage("Invalid Destination Address"),
       
        getFare)


module.exports = router;