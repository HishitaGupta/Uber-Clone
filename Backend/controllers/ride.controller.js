const {validationResult} = require('express-validator');
const { createRide ,getFare} = require('../services/ride.service');
const { getCaptainsInTheRadius, getAddressCoordinates } = require('../services/maps.service');
const captainModel = require('../models/captain.model');
const {sendMessageToSocketId} = require('../socket');

// module.exports.createRide = async (req,res,next) => {

//     const errors = validationResult(req)

//     if(!errors.isEmpty())
//         return res.status(400).json({errors: errors.array()})

//     const {pickup,destination,vehicleType} = req.body;

//     try{

//     const ride = await createRide({userId:req.user._id,pickup,destination,vehicleType});

//     captainModel.createIndexes([
//         { location: "2dsphere" }
//       ]);

//     const pickUpCoordinates = await getAddressCoordinates(pickup);
//     console.log("pickUp corrdinates",pickUpCoordinates);
//     const captainInRadius = await getCaptainsInTheRadius({pickUpCoordinates.ltd,pickUpCoordinates.lng,50});

//     console.log("Captain In radius",captainInRadius);
        

//     return res.status(201).json(ride);
    

// }
//     catch(errors){
//         return res.status(400).json({errors: errors.message})
//     }

// }

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { pickup, destination, vehicleType } = req.body;
  
    try {
      // Assuming createRide creates a new ride
      const ride = await createRide({ userId: req.user._id, pickup, destination, vehicleType });
  
      // Get pickup coordinates
      const pickUpCoordinates = await getAddressCoordinates(pickup);
      console.log("PickUp coordinates", pickUpCoordinates);
  
      // Ensure the pickup coordinates are correct
      if (!pickUpCoordinates || !pickUpCoordinates.ltd || !pickUpCoordinates.lng) {
        return res.status(400).json({ errors: "Invalid pickup coordinates" });
      }
  
      // Get captains within a 50 km radius of pickup location
      const captainInRadius = await getCaptainsInTheRadius({
      
        lng: pickUpCoordinates.lng,
        ltd: pickUpCoordinates.ltd,
        radius: 100
      });
  
      console.log("Captains in radius", captainInRadius);
  
      // If no captains found in radius, return a meaningful response
      if ( captainInRadius.length === 0) {
        // return res.status(404).json({ message: "No captains available in the specified radius" });
        console.log("No captains available in the specified radius");
      }

      ride.otp=""

      captainInRadius.map(captain => {
        console.log("function",sendMessageToSocketId)
             sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: ride
        });
      });
  
      return res.status(201).json({
        ride
      });
  
    } catch (error) {
      console.error("Error creating ride:", error);
      return res.status(400).json({ errors: error.message });
    }
  };
  


module.exports.getFare = async (req,res,next) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})

    const {pickup,destination} = req.query;

    try{

    const fare = await getFare(pickup,destination);
    return res.status(200).json(fare);
    

}
    catch(errors){
        return res.status(400).json({errors: errors.message})
    }
}