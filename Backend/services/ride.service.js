
const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
// const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup,destination){

    if(!pickup || !destination){
        return('Pickup and Destination are required')
    };

    const distanceTime = await mapsService.getDistanceTime(pickup,destination);

    const baseFare = 50; // base fare in currency units
    const farePerKm = {
        car: 10,
        motorcycle: 5,
        auto: 7
    };

    const fare = {
        car: baseFare + (farePerKm.car * Number((distanceTime.distance.value)/1000)),
        motorcycle: baseFare + (farePerKm.motorcycle * Number((distanceTime.distance.value)/1000)),
        auto: baseFare + (farePerKm.auto * Number((distanceTime.distance.value)/1000))
    };

    return fare;
}

module.exports.getFare=getFare;

function generateOtp(num){
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}


module.exports.createRide = async ({userId,pickup,destination,vehicleType}) => {

    if
        (!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }
    
    const fare = await getFare(pickup,destination);

    const ride = rideModel.create({
        userId,
        pickup,
        destination,
        fare: fare[vehicleType],
        vehicleType,
        otp:generateOtp(6),
    }
    
    )

    return ride;
}