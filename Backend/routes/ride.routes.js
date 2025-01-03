const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const router = express.Router();
const {body} = require('express-validator');
const { createRide } = require('../controllers/ride.controller');

router.post("/create",
    authUser ,
    // body("userId").isString().isLength({min: 24,max:24}).withMessage("Invalid User Id"),
    body("pickup").isString().isLength({min: 3}).withMessage("Invalid Pickup Address"),
    body("destination").isString().isLength({min: 3}).withMessage("Invalid Destination Address"),
    body("vehicleType").isString().isIn(['auto','car','motorcycle']).withMessage("Invalid Vehicle Type"),
    createRide)


module.exports = router;