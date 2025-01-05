
const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
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


module.exports.confirmRide = async({rideId,captain})=>{
    if(!rideId){
        throw new Error("Ride Id is required")
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:"accepted",
        captain:captain
    })

    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('userId').populate('captain').select("+otp")

    if(!ride){
        throw new Error("Ride not found")
    }

    return ride;
}


module.exports.startRide=async({rideId,otp,captain})=>{
    if(!rideId || !otp){
        throw new Error("Ride Id and Otp are required")
    }

    const ride= await rideModel.findOne({
        _id:rideId
    }).populate('userId').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not Found')
    }

    if(ride.status!=="accepted"){
        throw new Error("Ride not accepted")
    }

    if(ride.otp !== otp){
        throw new Error('Invalid Otp')
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:"ongoing"

    })

    sendMessageToSocketId(ride.userId.socketId,{
        event:"ride-started",
        data:ride
    })

    return ride;
}


module.exports.endRide=async({rideId,captain})=>{
    if(!rideId){
        throw new Error("Ride Id is required")
    }

    const ride= await rideModel.findOne({
        _id:rideId,
        captain:captain._id
    }).populate('userId').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not Found')
    }

    // if(ride.status!=="accepted"){
    //     throw new Error("Ride not accepted")
    // }

    // if(ride.otp !== otp){
    //     throw new Error('Invalid Otp')
    // }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:"completed"

    })

    return ride;
}