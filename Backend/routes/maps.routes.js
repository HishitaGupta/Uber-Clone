const express = require('express');
const { getCoordinates,getDistanceTime,getAutoCompleteSuggestions} = require('../controllers/maps.controller');
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

router.get(
    "/get-coordinates",
    query("address").isString().isLength({ min: 3 }), 
    
    getCoordinates
);

router.get("/get-distance-time",
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    //  authUser, 
     getDistanceTime);


router.get("/get-suggestions",
    query("input").isString().isLength({ min: 3 }),
    getAutoCompleteSuggestions
)



module.exports = router;
