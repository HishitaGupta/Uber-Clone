const {validationResult} = require('express-validator');
const { createRide } = require('../services/ride.service');

module.exports.createRide = async (req,res,next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})

    const {pickup,destination,vehicleType} = req.body;

    try{

    const ride = await createRide({userId:req.user._id,pickup,destination,vehicleType});
    return res.status(201).json(ride);
    

}
    catch(errors){
        return res.status(400).json({errors: errors.message})
    }

}